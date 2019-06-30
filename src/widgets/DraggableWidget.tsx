import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { AbstractWorkspaceModel } from '../models/AbstractWorkspaceModel';

export interface DraggableWidgetProps {
	engine: WorkspaceEngine;
	model: AbstractWorkspaceModel;
	className?: string;
	onClick?: () => any;
	fullscreenEnabled?: boolean;
}

export class DraggableWidget extends React.Component<DraggableWidgetProps> {
	static WORKSPACE_MIME = 'panel';

	render() {
		return (
			<div
				draggable={true}
				onDragStart={event => {
					event.dataTransfer.setData(
						WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME),
						JSON.stringify(this.props.model.toArray())
					);
					event.dataTransfer.setData(WorkspaceEngine.namespaceMime(`id/${this.props.model.id}`), '');
				}}
				onDragEnd={event => {
					if (event.dataTransfer.dropEffect !== 'none') {
						this.props.model.parent.removeModel(this.props.model);
					}
					this.props.engine.setDraggingNode(null);
				}}
				{...this.props}>
				{this.props.children}
			</div>
		);
	}
}
