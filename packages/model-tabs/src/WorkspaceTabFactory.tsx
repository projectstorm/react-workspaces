import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';
import { TabGroupWidget } from './TabGroupWidget';
import * as React from 'react';
import * as _ from 'lodash';
import { TabButtonWidget } from './TabButtonWidget';
import { DropzoneOrderWidget, GenerateEvent, WorkspaceModelFactory } from '@projectstorm/react-workspaces-core';

export interface TabRenderer {
	render: () => any;
}

export class WorkspaceTabFactory<
	T extends WorkspaceTabbedModel = WorkspaceTabbedModel
> extends WorkspaceModelFactory<T> {
	renderers: Set<TabRenderer>;

	constructor() {
		super(WorkspaceTabbedModel.NAME);
		this.renderers = new Set<TabRenderer>();
	}

	generateModel(): T {
		return new WorkspaceTabbedModel() as T;
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
					return <TabButtonWidget model={child} engine={event.engine} key={child.id} />;
				})}
			</DropzoneOrderWidget>
		);
	}

	generateContent(event: GenerateEvent<T>): JSX.Element {
		return (
			<TabGroupWidget tabs={this.generateTabs(event)} key={event.model.id} model={event.model} engine={event.engine} />
		);
	}
}
