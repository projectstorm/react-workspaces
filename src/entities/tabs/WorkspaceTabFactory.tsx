import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';
import { WorkspaceLayoutFactory } from '../../core/WorkspaceLayoutFactory';
import { GenerateEvent } from '../../core/WorkspaceFactory';
import { TabGroupWidget } from './TabGroupWidget';
import * as React from 'react';
import * as _ from 'lodash';
import { TabButtonWidget } from './TabButtonWidget';
import { DropzoneOrderWidget } from '../../widgets/dropzone/DropzoneOrderWidget';

export class WorkspaceTabFactory<T extends WorkspaceTabbedModel = WorkspaceTabbedModel> extends WorkspaceLayoutFactory<
	T
> {
	constructor() {
		super(WorkspaceTabbedModel.NAME);
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
				}}>
				{_.map(event.model.children, child => {
					return <TabButtonWidget model={child} engine={event.engine} key={child.id} />;
				})}
			</DropzoneOrderWidget>
		);
	}

	generateLayout(event: GenerateEvent<T>): JSX.Element {
		return (
			<TabGroupWidget tabs={this.generateTabs(event)} key={event.model.id} model={event.model} engine={event.engine} />
		);
	}
}
