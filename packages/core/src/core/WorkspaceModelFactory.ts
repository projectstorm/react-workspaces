import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngine } from './WorkspaceEngine';
import { BaseListener, BaseObserver } from './BaseObserver';

export interface WorkspaceModelFactoryEvent<T extends WorkspaceModel> {
  engine: WorkspaceEngine;
  model: T;
}

export interface WorkspaceModelFactoryListener<T> extends BaseListener {
  modelGenerated: (event: { model: T }) => any;
}

export abstract class WorkspaceModelFactory<
  T extends WorkspaceModel = WorkspaceModel,
  E extends WorkspaceModelFactoryEvent<T> = WorkspaceModelFactoryEvent<T>
> extends BaseObserver<WorkspaceModelFactoryListener<T>> {
  type: string;
  engine: WorkspaceEngine;

  constructor(type: string) {
    super();
    this.type = type;
  }

  setEngine(engine: WorkspaceEngine) {
    this.engine = engine;
  }

  generateModel(): T {
    const model = this._generateModel();
    this.iterateListeners((cb) => cb.modelGenerated?.({ model }));
    return model;
  }

  protected abstract _generateModel(): T;

  abstract generateContent(event: E): JSX.Element;
}
