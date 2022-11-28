import {
  SubComponentModelFactory,
  SubComponentRenderer,
  WorkspaceModel,
  WorkspaceModelFactoryEvent
} from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from './FloatingWindowModel';

export interface FloatingWindowRendererEvent<T extends FloatingWindowModel = FloatingWindowModel>
  extends WorkspaceModelFactoryEvent<T> {
  titlebar: JSX.Element;
  content: JSX.Element;
}

export interface FloatingWindowSubRendererEvent {
  model: WorkspaceModel;
}

export interface FloatingWindowRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
  renderWindowTitle: (event: FloatingWindowSubRendererEvent) => any;
}

export abstract class FloatingWindowFactory<
  T extends FloatingWindowModel = FloatingWindowModel
> extends SubComponentModelFactory<FloatingWindowModel, FloatingWindowRenderer, FloatingWindowRendererEvent<T>> {
  static TYPE = 'floating-window';

  constructor(type: string) {
    super(type);
  }
}
