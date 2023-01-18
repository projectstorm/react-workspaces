import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import {
  WorkspaceModel,
  WorkspaceModelFactoryEvent,
  WorkspaceNodeFactory,
  WorkspaceNodePanelRenderer
} from '@projectstorm/react-workspaces-core';
import { FloatingWindowFactory } from '@projectstorm/react-workspaces-model-floating-window';
import { setupIconPositionBehavior } from './iconPositionBehavior';

export interface TrayModelPanelRendererEvent<T extends WorkspaceModel> {
  model: T;
  parent: WorkspaceTrayModel;
  selected: boolean;
}

export interface TrayModelPanelRenderer<T extends WorkspaceModel = WorkspaceModel> extends WorkspaceNodePanelRenderer {
  renderIcon(event: TrayModelPanelRendererEvent<T>): JSX.Element;
}

export interface WorkspaceTrayFactoryOptions {
  windowFactory: FloatingWindowFactory;
  installIconPositionListener?: boolean;
}

export class WorkspaceTrayFactory<T extends WorkspaceTrayModel = WorkspaceTrayModel> extends WorkspaceNodeFactory<
  T,
  TrayModelPanelRenderer
> {
  constructor(protected options: WorkspaceTrayFactoryOptions) {
    super(WorkspaceTrayModel.NAME);
  }

  generateModel(): T {
    const model = new WorkspaceTrayModel({
      iconWidth: 50,
      expandedWidth: 200,
      factory: this.options.windowFactory
    }) as T;
    if (this.options.installIconPositionListener) {
      setupIconPositionBehavior(model);
    }
    return model;
  }

  generateTrayHeader(event: WorkspaceModelFactoryEvent<T>) {
    return null;
  }

  generateContent(event: WorkspaceModelFactoryEvent<T>): JSX.Element {
    return (
      <TrayWidget factory={this} header={this.generateTrayHeader(event)} node={event.model} engine={event.engine} />
    );
  }
}
