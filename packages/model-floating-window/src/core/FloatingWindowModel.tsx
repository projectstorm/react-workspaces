import {
  DimensionContainer,
  IDimension,
  Position,
  SerializedModel,
  WorkspaceEngineInterface,
  WorkspaceModel,
  WorkspaceModelListener
} from '@projectstorm/react-workspaces-core';

export interface FloatingWindowModelListener extends WorkspaceModelListener {
  childUpdated: () => any;
}

export interface SerializedFloatingWindowModel extends SerializedModel {
  dimensions: IDimension;
  model: SerializedModel;
}

export class FloatingWindowModel extends WorkspaceModel<SerializedFloatingWindowModel, FloatingWindowModelListener> {
  position: Position;
  dimension: DimensionContainer;
  serializeToRoot: boolean;

  static TYPE = 'floating-window';
  private parentListener: () => any;

  constructor(type: string, public child: WorkspaceModel) {
    super(type);
    this.serializeToRoot = true;
    this.position = new Position();
    this.dimension = new DimensionContainer({
      position: this.position,
      size: this.size
    });
    this.position.registerListener({
      updated: () => {
        this.r_dimensions.invalidate();
        this.normalizePosition();
      }
    });
  }

  fromArray(payload: SerializedFloatingWindowModel, engine: WorkspaceEngineInterface) {
    super.fromArray(payload, engine);
    this.dimension.update(payload.dimensions);
    const model = engine.getFactory(payload.model.type).generateModel();
    model.fromArray(payload.model, engine);
    this.setChild(model);
  }

  toArray(): SerializedFloatingWindowModel {
    return {
      ...super.toArray(),
      dimensions: this.dimension.dimensions,
      model: this.child.toArray()
    };
  }

  setParent(parent: WorkspaceModel) {
    super.setParent(parent);
    if (parent) {
      this.parentListener = parent.r_dimensions.registerListener({
        updated: () => {
          this.normalizePosition();
        }
      });
    } else {
      this.parentListener?.();
    }
  }

  setChild(child: WorkspaceModel) {
    this.child = child;
    child.setParent(this);
    this.invalidateLayout();
    this.iterateListeners((cb) => cb.childUpdated?.());
  }

  normalizePosition() {
    if (!this.parent) {
      return;
    }

    // cant do anything about this
    if (this.size.height > this.parent.r_dimensions.size.height) {
      return;
    }
    // cant do anything about this
    if (this.size.width > this.parent.r_dimensions.size.width) {
      return;
    }

    if (this.position.left < this.parent.r_dimensions.position.left) {
      this.position.update({
        left: 0
      });
    }
    if (this.position.top < this.parent.r_dimensions.position.top) {
      this.position.update({
        top: 0
      });
    }
    if (
      this.position.left + this.size.width >
      this.parent.r_dimensions.position.left + this.parent.r_dimensions.size.width
    ) {
      this.position.update({
        left: this.parent.r_dimensions.position.left + this.parent.r_dimensions.size.width - this.size.width
      });
    }
    if (
      this.position.top + this.size.height >
      this.parent.r_dimensions.position.top + this.parent.r_dimensions.size.height
    ) {
      this.position.update({
        top: this.parent.r_dimensions.position.top + this.parent.r_dimensions.size.height - this.size.height
      });
    }
  }
}
