import {
  Alignment,
  WorkspaceEngine,
  WorkspaceModel,
  WorkspaceNodeModel,
  WorkspaceNodeModelListener,
  WorkspaceNodeModelSerialized
} from '@projectstorm/react-workspaces-core';
import {
  FloatingWindowFactory,
  FloatingWindowModel,
  RootWorkspaceModel
} from '@projectstorm/react-workspaces-model-floating-window';

export enum WorkspaceTrayMode {
  COLLAPSED = 'micro',
  NORMAL = 'expand'
}

export enum TrayIconPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface WorkspaceTrayModelOptions {
  iconWidth: number;
  expandedWidth: number;
  factory: FloatingWindowFactory;
}

export interface WorkspaceTrayModelListener extends WorkspaceNodeModelListener {
  selectionChanged: () => any;
  iconPositionChanged: () => any;
}

export interface SerializedWorkspaceTrayModel extends WorkspaceNodeModelSerialized {
  selected: string;
  iconPosition: TrayIconPosition;
  mode: WorkspaceTrayMode;
}

export class WorkspaceTrayModel extends WorkspaceNodeModel<SerializedWorkspaceTrayModel, WorkspaceTrayModelListener> {
  mode: WorkspaceTrayMode;
  iconBarPosition: TrayIconPosition;
  selectedModel: WorkspaceModel;
  floatingWindow: FloatingWindowModel;

  private normalSize: number;
  private childListener: () => any;

  static NAME = 'srw-tray';

  constructor(public options: WorkspaceTrayModelOptions) {
    super(WorkspaceTrayModel.NAME);
    this.setExpand(false, true);
    this.selectedModel = null;
    this.iconBarPosition = TrayIconPosition.LEFT;
    this.floatingWindow = options.factory.generateModel();
    this.floatingWindow.setParent(this);

    // the tray model will handle this
    this.floatingWindow.serializeToRoot = false;
    this.floatingWindow.registerListener({
      removed: () => {
        // if the floating window is removed, update the selected item back to null
        // this can happen if a close button on the window deletes the window\
        this.setSelectedModel(null);
      },
      childUpdated: () => {
        this.floatingWindow.minimumSize.update({
          width: 100,
          height: 100
        });
        this.updateWindowPosition(this.floatingWindow.child);
        this.childListener?.();
        this.childListener = this.floatingWindow.child.r_dimensions.registerListener({
          updated: () => {
            this.updateWindowPosition(this.floatingWindow.child);
          }
        });
      }
    });
    this.normalSize = options.expandedWidth;
    this.size.registerListener({
      updated: () => {
        if (this.mode === WorkspaceTrayMode.NORMAL) {
          this.normalSize = this.size.width;
        }
      }
    });
    this.setMode(WorkspaceTrayMode.NORMAL);
  }

  setIconPosition(position: TrayIconPosition) {
    if (this.iconBarPosition === position) {
      return;
    }
    this.iconBarPosition = position;
    this.iterateListeners((cb) => cb.iconPositionChanged?.());
  }

  getSelectedModel() {
    return this.selectedModel;
  }

  setSelectedModel(child: WorkspaceModel) {
    if (this.selectedModel === child) {
      return;
    }
    this.selectedModel = child;
    if (this.mode === WorkspaceTrayMode.COLLAPSED) {
      this.setFloatingModel(child);
    }
    this.iterateListeners((cb) => cb.selectionChanged?.());
  }

  updateWindowPosition(child: WorkspaceModel) {
    const root = this.getRootModel();
    const dims = this.r_dimensions.getRelativeToPosition(root.r_dimensions.position);
    // left aligned
    if (dims[Alignment.LEFT] < root.r_dimensions.size.width / 2) {
      this.floatingWindow.position.update({
        left: child.r_dimensions.position.left + child.r_dimensions.size.width,
        top: child.r_dimensions.position.top
      });
    }
    // right aligned
    else {
      this.floatingWindow.position.update({
        left: -this.floatingWindow.size.width + child.r_dimensions.position.left,
        top: child.r_dimensions.position.top
      });
    }
  }

  get expandHorizontal(): boolean {
    if (this.mode === WorkspaceTrayMode.COLLAPSED) {
      return false;
    }
    return super.expandHorizontal;
  }

  delete() {
    super.delete();
    this.childListener?.();
  }

  toArray(): SerializedWorkspaceTrayModel {
    return {
      ...super.toArray(),
      mode: this.mode,
      selected: this.selectedModel?.id,
      iconPosition: this.iconBarPosition
    };
  }

  fromArray(payload: SerializedWorkspaceTrayModel, engine: WorkspaceEngine) {
    super.fromArray(payload, engine);
    this.setIconPosition(payload['iconPosition'] || TrayIconPosition.LEFT);
    if (payload.selected) {
      this.setSelectedModel(this.children.find((m) => m.id === payload.selected) || null);
    }
    this.setMode(payload['mode'] || WorkspaceTrayMode.NORMAL);
  }

  addModel(model: WorkspaceModel, position: number = null): this {
    super.addModel(model, position);
    this.normalizeSelectedModel();
    return this;
  }

  removeModel(model: WorkspaceModel): this {
    super.removeModel(model);
    if (this.selectedModel && this.selectedModel === model) {
      this.selectedModel = null;
    }
    this.normalizeSelectedModel();
    return this;
  }

  normalizeSelectedModel() {
    if (this.mode === WorkspaceTrayMode.NORMAL && this.selectedModel == null) {
      this.setSelectedModel(this.children[0]);
    }
  }

  setMode(mode: WorkspaceTrayMode): this {
    this.mode = mode;

    //lock in all the sizes when collapsed
    if (this.mode === WorkspaceTrayMode.COLLAPSED) {
      this.setSelectedModel(null);
      this.size.update({
        width: this.options.iconWidth
      });
      this.maximumSize.update({
        width: this.options.iconWidth
      });
      this.minimumSize.update({
        width: this.options.iconWidth
      });
    } else {
      // the order of these two calls are important
      this.setFloatingModel(null);
      this.normalizeSelectedModel();
      this.maximumSize.update({
        width: 0
      });
      this.minimumSize.update({
        width: 0
      });
      this.size.update({
        width: this.normalSize
      });
    }
    this.invalidateLayout();
    return this;
  }

  protected _getRootModel() {
    return this.getRootModel() as RootWorkspaceModel;
  }

  setFloatingModel(model: WorkspaceModel | null): this {
    if (model === null) {
      this.floatingWindow.delete();
      return this;
    }
    this.floatingWindow.setChild(model);

    // add the window
    const root = this._getRootModel();
    if (root?.addFloatingWindow) {
      root.addFloatingWindow(this.floatingWindow);
    }
    return this;
  }
}
