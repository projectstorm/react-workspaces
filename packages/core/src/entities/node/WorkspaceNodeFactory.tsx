import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import * as React from 'react';
import { WorkspaceModelFactoryEvent } from '../../core/WorkspaceModelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { SubComponentModelFactory, SubComponentRenderer } from '../SubComponentModelFactory';
import { WorkspaceNodeWidget } from './WorkspaceNodeWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface RenderTitleBarEvent<T extends WorkspaceModel> {
	model: T;
	engine: WorkspaceEngine;
}

export interface WorkspaceNodePanelRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
	renderTitleBar(model: RenderTitleBarEvent<T>): JSX.Element;
}

export class WorkspaceNodeFactory<T extends WorkspaceNodeModel = WorkspaceNodeModel> extends SubComponentModelFactory<
	T,
	WorkspaceNodePanelRenderer
> {
	renderers: Set<WorkspaceNodePanelRenderer>;

	constructor() {
		super(WorkspaceNodeModel.NAME);
		this.renderers = new Set<WorkspaceNodePanelRenderer>();
	}

	generateModel(): T {
		return new WorkspaceNodeModel() as T;
	}

	generateContent(event: WorkspaceModelFactoryEvent<T>): JSX.Element {
		return <WorkspaceNodeWidget model={event.model} engine={event.engine} factory={this} />;
	}
}
