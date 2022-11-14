import { TabGroupWidget } from './TabGroupWidget';
import * as React from 'react';
import * as _ from 'lodash';
import { TabButtonWidget } from './TabButtonWidget';
import {
	DropzoneOrderWidget,
	GenerateEvent,
	RenderContentEvent,
	WorkspaceModel,
	WorkspaceModelFactory
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';

export interface TabRendererEvent<T extends WorkspaceModel> {
	model: T;
	selected: boolean;
}

export interface TabRenderer<T extends WorkspaceModel = WorkspaceModel> {
	matchModel(model: T): boolean;

	renderTab(event: TabRendererEvent<T>): JSX.Element;
}

export class WorkspaceTabFactory<T extends WorkspaceTabModel = WorkspaceTabModel> extends WorkspaceModelFactory<T> {
	renderers: Set<TabRenderer>;

	constructor() {
		super(WorkspaceTabModel.NAME);
		this.renderers = new Set<TabRenderer>();
	}

	generateModel(): T {
		return new WorkspaceTabModel() as T;
	}

	addTabRenderer(r: TabRenderer) {
		this.renderers.add(r);
	}

	renderTabForModel(model: WorkspaceModel, selected: boolean) {
		for (let r of this.renderers.values()) {
			if (r.matchModel(model)) {
				return r.renderTab({
					model: model,
					selected: selected
				});
			}
		}
		return <span>{model.type}</span>;
	}

	generateTabs(event: GenerateEvent<T>) {
		return (
			<DropzoneOrderWidget
				size={50}
				engine={event.engine}
				vertical={false}
				dropped={(element, index) => {
					event.model.addModel(element, index);
				}}
			>
				{_.map(event.model.children, (child) => {
					return <TabButtonWidget factory={this} model={child} engine={event.engine} key={child.id} />;
				})}
			</DropzoneOrderWidget>
		);
	}

	generateContent(event: RenderContentEvent<T>): JSX.Element {
		return (
			<TabGroupWidget tabs={this.generateTabs(event)} key={event.model.id} model={event.model} engine={event.engine} />
		);
	}
}
