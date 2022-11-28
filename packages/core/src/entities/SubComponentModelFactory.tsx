import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceModelFactory, WorkspaceModelFactoryEvent } from '../core/WorkspaceModelFactory';

export interface SubComponentRenderer<T extends WorkspaceModel = WorkspaceModel> {
  matchModel(model: T): boolean;
}

export abstract class SubComponentModelFactory<
  T extends WorkspaceModel,
  R extends SubComponentRenderer,
  E extends WorkspaceModelFactoryEvent<T> = WorkspaceModelFactoryEvent<T>
> extends WorkspaceModelFactory<T, E> {
  renderers: Set<R>;

  constructor(type: string) {
    super(type);
    this.renderers = new Set();
  }

  addRenderer(r: R) {
    this.renderers.add(r);
  }

  getRendererForModel(model: WorkspaceModel): R {
    for (let r of this.renderers.values()) {
      if (r.matchModel(model)) {
        return r;
      }
    }
  }
}
