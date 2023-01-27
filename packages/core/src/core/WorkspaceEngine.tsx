import * as React from 'react';
import { WorkspaceModelFactory } from './WorkspaceModelFactory';
import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngineInterface } from './WorkspaceEngineInterface';
import { BaseListener, BaseObserver } from './BaseObserver';
import { LayerManager } from '../widgets/layers/LayerManager';
import { DimensionContainer } from './dimensions/DimensionContainer';
import { WorkspaceCollectionModel } from '../core-models/WorkspaceCollectionModel';

export interface WorkspaceEngineListener extends BaseListener {
  repaint?: () => any;
  draggingElement?: (model: WorkspaceModel, dragging: boolean) => any;
  modelUpdated?: () => any;
  layoutInvalidated: () => any;
  dimensionsInvalidated: () => any;
  layoutRepainted: () => any;
  modelDragStart: () => any;
  modelDragEnd: () => any;
  lockUpdated: () => any;
}

export class WorkspaceEngineError extends Error {
  public _is__storm_workspaces_error_: true;

  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, WorkspaceEngineError.prototype);
  }
}

export class WorkspaceEngine extends BaseObserver<WorkspaceEngineListener> implements WorkspaceEngineInterface {
  // factories
  factories: { [type: string]: WorkspaceModelFactory };
  draggingID: string;
  layerManager: LayerManager;
  repainting: boolean;
  locked: boolean;

  // dimensions
  workspaceContainer: DimensionContainer;

  // root
  public rootModel: WorkspaceModel;
  private rootModelListener: () => any;

  constructor() {
    super();
    this.locked = false;
    this.factories = {};
    this.listeners = {};
    this.draggingID = null;
    this.layerManager = new LayerManager();
    this.workspaceContainer = new DimensionContainer();
    this.rootModel = null;
  }

  setRootModel(model: WorkspaceModel) {
    this.rootModelListener?.();
    this.rootModelListener = model.registerListener({
      layoutInvalidated: () => {
        this.invalidateLayout();
      },
      dimensionsInvalidated: () => {
        this.invalidateDimensions();
      }
    });
    this.rootModel = model;
    this.iterateListeners((cb) => cb.modelUpdated?.());
    this.iterateListeners((cb) => cb.layoutInvalidated?.());
  }

  fireRepainted() {
    this.iterateListeners((cb) => cb.layoutRepainted?.());
  }

  invalidateLayout() {
    this.iterateListeners((cb) => cb.layoutInvalidated?.());
  }

  invalidateDimensions() {
    this.rootModel
      .flatten()
      .flatMap((m) => {
        return m.getAllRenderDimensions();
      })
      .forEach((d) => {
        d.invalidate();
      });
    this.iterateListeners((cb) => cb.dimensionsInvalidated?.());
  }

  setLocked(locked: boolean = true) {
    if (this.locked === locked) {
      return;
    }
    this.locked = locked;
    this.iterateListeners((cb) => cb.lockUpdated?.());
  }

  static namespaceMime(data: string) {
    return `srw/${data}`;
  }

  fireRepaintListeners() {
    this.repainting = true;
    this.iterateListeners((list) => {
      list.repaint?.();
    });
  }

  normalize() {
    this.rootModel
      .flatten()
      .filter((m) => m instanceof WorkspaceCollectionModel)
      .forEach((m: WorkspaceCollectionModel) => m.normalize());
  }

  registerFactory(factory: WorkspaceModelFactory) {
    this.factories[factory.type] = factory;
    factory.setEngine(this);
  }

  getFactory<T extends WorkspaceModelFactory>(model: WorkspaceModel | string): T {
    if (typeof model !== 'string') {
      model = model.type;
    }
    if (!this.factories[model]) {
      throw new WorkspaceEngineError('Cannot find Workspace factory for model with type: [' + model + ']');
    }
    return this.factories[model] as T;
  }

  setDraggingNode(id: string) {
    if (this.draggingID !== id) {
      this.draggingID = id;
      this.iterateListeners((cb) => cb.modelDragStart?.());
    } else if (id === null) {
      this.iterateListeners((cb) => cb.modelDragEnd?.());
    }
  }
}
