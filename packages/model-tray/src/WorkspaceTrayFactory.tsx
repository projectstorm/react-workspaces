import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import {
	WorkspaceModel,
	WorkspaceModelFactoryEvent,
	WorkspaceNodeFactory,
	WorkspaceNodePanelRenderer
} from '@projectstorm/react-workspaces-core';

export interface TrayModelPanelRendererEvent<T extends WorkspaceModel> {
	model: T;
}

export interface TrayModelPanelRenderer<T extends WorkspaceModel = WorkspaceModel> extends WorkspaceNodePanelRenderer {
	renderIcon(event: TrayModelPanelRendererEvent<T>): JSX.Element;
}

export class WorkspaceTrayFactory<T extends WorkspaceTrayModel = WorkspaceTrayModel> extends WorkspaceNodeFactory<
	T,
	TrayModelPanelRenderer
> {
	constructor() {
		super(WorkspaceTrayModel.NAME);
	}

	generateModel(): T {
		return new WorkspaceTrayModel() as T;
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
