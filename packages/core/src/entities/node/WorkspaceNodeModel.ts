import {
  SerializedCollectionModel,
  WorkspaceCollectionModel,
  WorkspaceCollectionModelListener
} from '../../core-models/WorkspaceCollectionModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { Alignment } from '../../core/tools';
import { DimensionContainer } from '../../core/dimensions/DimensionContainer';
import { DirectionLayoutChildDirective } from '../../widgets/layouts/DirectionalChildWidget';
import { ResizeDimensionContainer } from './ResizeDimensionContainer';

export interface ResizeDivision {
  before: WorkspaceModel;
  after: WorkspaceModel;
  dimensions: ResizeDimensionContainer;
  vertical: boolean;
}

export interface WorkspaceNodeModelListener extends WorkspaceCollectionModelListener {
  divisionsRecomputed: () => any;
  overConstrainedChanged: () => any;
}

export interface WorkspaceNodeModelSerialized extends SerializedCollectionModel {
  vertical: boolean;
}

export class WorkspaceNodeModel<
  T extends WorkspaceNodeModelSerialized = WorkspaceNodeModelSerialized,
  L extends WorkspaceNodeModelListener = WorkspaceNodeModelListener
> extends WorkspaceCollectionModel<T, L> {
  static NAME = 'srw-node';

  vertical: boolean;
  r_divisions: ResizeDimensionContainer[];
  r_overConstrained: boolean;

  constructor(type: string = WorkspaceNodeModel.NAME) {
    super(type);
    this.vertical = true;
    this.r_divisions = [];
    this.r_overConstrained = false;
  }

  normalize() {
    super.normalize();
    if (this.parent && this.parent instanceof WorkspaceCollectionModel) {
      if (this.children.length === 1) {
        this.parent.replaceModel(this, this.children[0]);
      }
    }
  }

  // !----------- additional renders ---------

  setOverConstrained(overConstrainedChanged: boolean) {
    if (this.r_overConstrained === overConstrainedChanged) {
      return;
    }
    this.r_overConstrained = overConstrainedChanged;
    this.iterateListeners((cb) => cb.overConstrainedChanged?.());
  }

  // !----------- serialize ---------

  toArray(): T {
    return {
      ...super.toArray(),
      vertical: this.vertical
    };
  }

  fromArray(payload: T, engine: WorkspaceEngine) {
    super.fromArray(payload, engine);
    this.vertical = payload['vertical'];
  }

  // !----------- divisions ---------

  getResizeDivisions(): ResizeDivision[] {
    let divs: ResizeDivision[] = [];
    for (let i = 1; i < this.r_divisions.length - 1; i++) {
      if (this.vertical) {
        if (this.children[i - 1].expandVertical && this.children[i].expandVertical) {
          continue;
        }
      } else {
        if (this.children[i - 1].expandHorizontal && this.children[i].expandHorizontal) {
          continue;
        }
      }

      divs.push({
        before: this.children[i - 1],
        after: this.children[i],
        dimensions: this.r_divisions[i],
        vertical: !this.vertical
      });
    }
    return divs;
  }

  getPanelDirective(child: WorkspaceModel): DirectionLayoutChildDirective {
    return {
      expand: this.vertical ? child.expandVertical : child.expandHorizontal,
      size: this.vertical ? child.size.height : child.size.width
    };
  }

  getAllRenderDimensions(): DimensionContainer[] {
    return super.getAllRenderDimensions().concat(Array.from(this.r_divisions.values()));
  }

  recomputeDivisions() {
    this.r_divisions = this.children
      .map((c) => {
        return new ResizeDimensionContainer();
      })
      .concat(new ResizeDimensionContainer());
    this.iterateListeners((cb) => cb.divisionsRecomputed?.());
  }

  addModel(model: WorkspaceModel, position: number = null): this {
    super.addModel(model, position);
    this.recomputeDivisions();
    return this;
  }

  removeModel(model: WorkspaceModel): this {
    super.removeModel(model);
    this.recomputeDivisions();
    return this;
  }

  shouldExpand() {
    if (!this.vertical) {
      return this.expandVertical;
    }
    return this.expandHorizontal;
  }

  setVertical(vertical: boolean = true): this {
    this.vertical = vertical;
    return this;
  }

  setHorizontal(horizontal: boolean = true): this {
    this.vertical = !horizontal;
    return this;
  }

  getChildSibling(model: WorkspaceModel, alignment: Alignment): WorkspaceModel {
    if (this.vertical && alignment === Alignment.TOP) {
      return this.getModelBefore(model);
    } else if (this.vertical && alignment === Alignment.BOTTOM) {
      return this.getModelAfter(model);
    }
    if (!this.vertical && alignment === Alignment.LEFT) {
      return this.getModelBefore(model);
    } else if (!this.vertical && alignment === Alignment.RIGHT) {
      return this.getModelAfter(model);
    }
    return null;
  }
}
