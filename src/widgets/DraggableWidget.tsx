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

export interface DraggableWidgetState {}

export class DraggableWidget extends React.Component<DraggableWidgetProps, DraggableWidgetState> {
	static WORKSPACE_MIME = 'srw/panel';

	constructor(props: DraggableWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div
				draggable={true}
				onDragStart={event => {
					this.setState({ dragging: true });
					event.dataTransfer.setData(DraggableWidget.WORKSPACE_MIME, JSON.stringify(this.props.model.toArray()));
					this.props.engine.setDraggingNode();
				}}
				onDragEnd={event => {
					if (event.dataTransfer.dropEffect !== 'none') {
						this.props.model.parent.removeModel(this.props.model);
					}
					this.setState({ dragging: false });
					this.props.engine.setDraggingNode(false);
				}}
				{...this.props}>
				{this.props.children}
			</div>
		);
	}
}
