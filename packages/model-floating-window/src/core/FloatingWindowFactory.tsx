import {
  SubComponentModelFactory,
  SubComponentRenderer,
  WorkspaceEngine,
  WorkspaceModel,
  WorkspaceModelFactoryEvent
} from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from './FloatingWindowModel';

export interface FloatingWindowRendererEvent<T extends FloatingWindowModel = FloatingWindowModel>
  extends WorkspaceModelFactoryEvent<T> {
  titlebar: React.JSX.Element;
  content: React.JSX.Element;
}

export interface FloatingWindowSubRendererEvent<T extends WorkspaceModel> {
  model: T;
  engine: WorkspaceEngine;
}

export interface FloatingWindowRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
  renderWindowTitle: (event: FloatingWindowSubRendererEvent<T>) => any;
}

export abstract class FloatingWindowFactory<
  T extends FloatingWindowModel = FloatingWindowModel
> extends SubComponentModelFactory<FloatingWindowModel, FloatingWindowRenderer, FloatingWindowRendererEvent<T>> {
  static TYPE = 'floating-window';

  constructor(type: string) {
    super(type);
  }
}
