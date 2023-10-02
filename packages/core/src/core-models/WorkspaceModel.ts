import { WorkspaceEngineInterface } from '../core/WorkspaceEngineInterface';
import { BaseListener, BaseObserver } from '../core/BaseObserver';
import { Alignment } from '../core/tools';
import { v4 } from 'uuid';
import { ISize, Size } from '../core/dimensions/Size';
import { DimensionContainer, IDimension } from '../core/dimensions/DimensionContainer';
import { WorkspaceCollectionModel } from './WorkspaceCollectionModel';

export interface SerializedModel {
  id: string;
  expandVertical: boolean;
  expandHorizontal: boolean;
  type: string;
  width: number;
  height: number;
}

export interface WorkspaceModelListener extends BaseListener {
  removed?: () => any;
  layoutInvalidated?: () => any;
  dimensionsInvalidated?: () => any;
  visibilityChanged?: () => any;
}

export class WorkspaceModelSize extends Size {
  constructor(
    protected min: Size,
    protected max: Size
  ) {
    super();

    this.min.registerListener({
      updated: () => {
        this.update(this.value);
      }
    });
    this.max.registerListener({
      updated: () => {
        this.update(this.value);
      }
    });
  }

  update(size: Partial<ISize>) {
    if (size.width != null) {
      if (size.width < this.min.width) {
        size.width = this.min.width;
      } else if (this.max.width > 0 && size.width > this.max.width) {
        size.width = this.max.width;
      }
    }

    if (size.height != null) {
      if (size.height < this.min.height) {
        size.height = this.min.height;
      } else if (this.max.height > 0 && size.width > this.max.height) {
        size.height = this.max.height;
      }
    }
    super.update(size);
  }
}

export class WorkspaceModel<
  T extends SerializedModel = SerializedModel,
  L extends WorkspaceModelListener = WorkspaceModelListener
> extends BaseObserver<L> {
  id: string;
  private _expandVertical: boolean;
  private _expandHorizontal: boolean;

  size: Size;
  minimumSize: Size;
  maximumSize: Size;

  parent: WorkspaceModel;
  type: string;

  // render properties
  public r_dimensions: DimensionContainer;
  public r_visible: boolean;

  constructor(type: string) {
    super();
    this.type = type;
    this.id = v4();
    this.parent = null;
    this._expandHorizontal = true;
    this._expandVertical = true;
    this.minimumSize = new Size();
    this.maximumSize = new Size();
    this.size = new WorkspaceModelSize(this.minimumSize, this.maximumSize);
    this.r_visible = false;
    this.r_dimensions = new DimensionContainer();
    this.r_dimensions.registerListener({
      updated: () => {
        if (this.size.width === 0 && this.size.height === 0) {
          this.setSize({
            width: this.r_dimensions.dimensions.width,
            height: this.r_dimensions.dimensions.height
          });
        }
      }
    });
    this.size.registerListener({
      updated: () => {
        this.invalidateDimensions();
      }
    });
  }

  get expandHorizontal(): boolean {
    return this._expandHorizontal;
  }

  set expandHorizontal(value: boolean) {
    this._expandHorizontal = value;
  }

  get expandVertical(): boolean {
    return this._expandVertical;
  }

  set expandVertical(value: boolean) {
    this._expandVertical = value;
  }

  async waitForInitialRenderedSize(): Promise<IDimension> {
    return new Promise((resolve) => {
      let l1, l2;
      l1 = this.r_dimensions.registerListener({
        updated: () => {
          if (this.r_dimensions.size.width > 0) {
            resolve(this.r_dimensions.dimensions);
            l1?.();
            l2?.();
          }
        }
      });
      l2 = this.registerListener({
        visibilityChanged: () => {
          if (this.r_visible) {
            this.r_dimensions.invalidate(true);
          }
        }
      } as Partial<L>);
    });
  }

  setWidth(width: number) {
    this.setSize({
      width: width
    });
  }

  setHeight(height: number) {
    this.setSize({
      height: height
    });
  }

  setSize(dims: Partial<ISize>) {
    this.size.update(dims);
  }

  getAllRenderDimensions() {
    return [this.r_dimensions];
  }

  invalidateDimensions() {
    this.iterateListeners((cb) => cb.dimensionsInvalidated?.());
  }

  invalidateLayout() {
    this.iterateListeners((cb) => cb.layoutInvalidated?.());
  }

  setVisible(visible: boolean) {
    if (this.r_visible === visible) {
      return;
    }
    this.r_visible = visible;
    this.iterateListeners((cb) => cb.visibilityChanged?.());
  }

  fireNodeRemoved() {
    this.iterateListeners((list) => {
      if (list.removed) {
        list.removed();
      }
    });
  }

  getSibling(alignment: Alignment): WorkspaceModel | null {
    if (this.parent instanceof WorkspaceCollectionModel) {
      return this.parent.getChildSibling(this, alignment);
    }
    return null;
  }

  delete() {
    this.fireNodeRemoved();
  }

  hasParentID(parentID: string): boolean {
    if (this.id === parentID) {
      return true;
    }
    if (!this.parent) {
      return false;
    }
    return this.parent.hasParentID(parentID);
  }

  setParent(parent: WorkspaceModel) {
    this.parent = parent;
  }

  getRootModel(): WorkspaceModel {
    if (!this.parent) {
      return this;
    }
    return this.parent.getRootModel();
  }

  setExpand(horizontal: boolean = true, vertical: boolean = true): this {
    this._expandHorizontal = horizontal;
    this._expandVertical = vertical;
    return this;
  }

  flatten(): WorkspaceModel[] {
    return [this];
  }

  toArray(): T {
    return {
      id: this.id,
      type: this.type,
      expandHorizontal: this._expandHorizontal,
      expandVertical: this._expandVertical,
      width: this.size.width,
      height: this.size.height
    } as T;
  }

  fromArray(payload: T, engine: WorkspaceEngineInterface) {
    this.id = payload.id;
    this._expandHorizontal = payload.expandHorizontal;
    this._expandVertical = payload.expandVertical;
    this.size.update({
      width: payload.width,
      height: payload.height
    });
  }
}
