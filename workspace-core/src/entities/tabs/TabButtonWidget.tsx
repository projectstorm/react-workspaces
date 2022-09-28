import * as React from 'react';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspacePanelFactory } from '../panel/WorkspacePanelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export interface TabButtonWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export class TabButtonWidget extends React.Component<TabButtonWidgetProps> {
	getContent() {
		const parent = this.props.model.parent as WorkspaceTabbedModel;
		return this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model).generatePanelTab({
			engine: this.props.engine,
			model: this.props.model,
			selected: this.props.model.id === parent.getSelected().id
		});
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
