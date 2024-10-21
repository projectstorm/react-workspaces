import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import * as React from 'react';
import { WorkspaceModelFactoryEvent } from '../../core/WorkspaceModelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { SubComponentModelFactory, SubComponentRenderer } from '../SubComponentModelFactory';
import { WorkspaceNodeWidget } from './WorkspaceNodeWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { ExpandNodeModel } from './ExpandNodeModel';
import { ExpandNodeWidget } from './ExpandNodeWidget';

export interface RenderTitleBarEvent<T extends WorkspaceModel> {
  model: T;
  engine: WorkspaceEngine;
}

export interface WorkspaceNodePanelRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
  renderTitleBar(model: RenderTitleBarEvent<T>): JSX.Element;
}

export class WorkspaceNodeFactory<
  T extends WorkspaceNodeModel = WorkspaceNodeModel,
  R extends WorkspaceNodePanelRenderer = WorkspaceNodePanelRenderer
> extends SubComponentModelFactory<T, R> {
  constructor(type: string = WorkspaceNodeModel.NAME) {
    super(type);
  }

  generateContent(event: WorkspaceModelFactoryEvent<T>): React.JSX.Element {
    if (event.model instanceof ExpandNodeModel) {
      return <ExpandNodeWidget model={event.model} engine={event.engine} factory={this} />;
    }
    return <WorkspaceNodeWidget model={event.model} engine={event.engine} factory={this} />;
  }

  protected _generateModel(): T {
    return new WorkspaceNodeModel() as T;
  }
}
