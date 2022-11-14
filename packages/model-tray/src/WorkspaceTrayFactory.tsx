import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import {
	GenerateEvent,
	RenderContentEvent,
	WorkspaceModel,
	WorkspaceModelFactory
} from '@projectstorm/react-workspaces-core';

export interface MicroPanelRendererEvent<T extends WorkspaceModel> {
	model: T;
}

export interface MicroPanelRenderer<T extends WorkspaceModel = WorkspaceModel> {
	matchModel(model: T): boolean;

	renderIcon(event: MicroPanelRendererEvent<T>): JSX.Element;
}

export class WorkspaceTrayFactory<T extends WorkspaceTrayModel = WorkspaceTrayModel> extends WorkspaceModelFactory<T> {
	renderers: Set<MicroPanelRenderer>;

	constructor() {
		super(WorkspaceTrayModel.NAME);
		this.renderers = new Set<MicroPanelRenderer>();
	}

	renderMicroPanelForModel(model: WorkspaceModel) {
		for (let r of this.renderers.values()) {
			if (r.matchModel(model)) {
				return r.renderIcon({
					model: model
				});
			}
		}
		return <span>{model.type}</span>;
	}

	addTabRenderer(r: MicroPanelRenderer) {
		this.renderers.add(r);
	}

	generateModel(): T {
		return new WorkspaceTrayModel() as T;
	}

	generateTrayHeader(event: GenerateEvent<T>) {
		return null;
	}

	generateContent(event: RenderContentEvent<T>): JSX.Element {
		return (
			<TrayWidget
				factory={this}
				header={this.generateTrayHeader(event)}
				key={event.model.id}
				node={event.model}
				engine={event.engine}
			/>
		);
	}
}
