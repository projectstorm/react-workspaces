import { TabGroupWidget } from './TabGroupWidget';
import * as React from 'react';
import * as _ from 'lodash';
import {
	SmartOrderingWidget,
	SubComponentModelFactory,
	SubComponentRenderer,
	WorkspaceModel,
	WorkspaceModelFactoryEvent
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';
import { TabButtonWidget } from './TabButtonWidget';
import styled from '@emotion/styled';

export interface TabRendererEvent<T extends WorkspaceModel> {
	model: T;
	selected: boolean;
}

export interface TabRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
	renderTab(event: TabRendererEvent<T>): JSX.Element;
}

export class WorkspaceTabFactory<T extends WorkspaceTabModel = WorkspaceTabModel> extends SubComponentModelFactory<
	T,
	TabRenderer
> {
	constructor() {
		super(WorkspaceTabModel.NAME);
	}

	generateModel(): T {
		return new WorkspaceTabModel() as T;
	}

	renderTabForModel(model: WorkspaceModel, selected: boolean) {
		const r = this.getRendererForModel(model);
		if (r) {
			return r.renderTab({
				model: model,
				selected: selected
			});
		}
		return <span>{model.type}</span>;
	}

	generateTabs(event: WorkspaceModelFactoryEvent<T>) {
		return (
			<S.TabGroup
				dropped={({ model, index }) => {
					event.model.addModel(model, index);
					event.engine.normalize();
				}}
				engine={event.engine}
				vertical={false}
				children={_.map(event.model.children, (child) => {
					return <TabButtonWidget factory={this} model={child} engine={event.engine} key={child.id} />;
				})}
			/>
		);
	}

	generateContent(event: WorkspaceModelFactoryEvent<T>): JSX.Element {
		return (
			<TabGroupWidget tabs={this.generateTabs(event)} key={event.model.id} model={event.model} engine={event.engine} />
		);
	}
}

namespace S {
	export const TabGroup = styled(SmartOrderingWidget)`
		display: flex;
	`;
}
