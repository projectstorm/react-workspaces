import { DraggableWidget, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';

export interface TabButtonWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export class TabButtonWidget extends React.Component<TabButtonWidgetProps> {
	getContent() {
		const parent = this.props.model.parent as WorkspaceTabbedModel;
		// return this.props.engine.getFactory(this.props.model).generatePanelTab({
		// 	engine: this.props.engine,
		// 	model: this.props.model,
		// 	selected: this.props.model.id === parent.getSelected().id
		// });
		return 'not sure';
	}

	render() {
		return (
			<DraggableWidget
				onClick={() => {
					(this.props.model.parent as WorkspaceTabbedModel).setSelected(this.props.model);
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
