import { DraggableWidget, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { WorkspaceTabFactory } from './WorkspaceTabFactory';
import { WorkspaceTabModel } from './WorkspaceTabModel';

export interface TabButtonWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	factory: WorkspaceTabFactory;
}

export class TabButtonWidget extends React.Component<TabButtonWidgetProps> {
	getContent() {
		const parent = this.props.model.parent as WorkspaceTabModel;
		return this.props.factory.renderTabForModel(this.props.model, this.props.model.id === parent.getSelected().id);
	}

	render() {
		return (
			<DraggableWidget
				onClick={() => {
					(this.props.model.parent as WorkspaceTabModel).setSelected(this.props.model);
					this.props.engine.fireRepaintListeners();
				}}
				engine={this.props.engine}
				model={this.props.model}
			>
				{this.getContent()}
			</DraggableWidget>
		);
	}
}
