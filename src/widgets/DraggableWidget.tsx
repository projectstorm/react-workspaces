import * as React from "react";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {AbstractWorkspaceModel} from "../models/AbstractWorkspaceModel";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";

export interface DraggableWidgetProps {
	engine: WorkspaceEngine;
	model: AbstractWorkspaceModel;
	className?: string;
	onClick?: () => any;
	fullscreenEnabled?: boolean;
}

export interface DraggableWidgetState {
}

export class DraggableWidget extends React.Component<DraggableWidgetProps, DraggableWidgetState> {

	static WORKSPACE_MIME = 'srw/panel';

	constructor(props: DraggableWidgetProps) {
		super(props);
		this.state = {
		};
	}

	render() {

		return (
			<div
				draggable={true}
				onDoubleClick={() => {
					if(this.props.fullscreenEnabled !== false) {
						if (this.props.engine.fullscreenModel) {
							this.props.engine.setFullscreenModel(null);
						} else if (this.props.model instanceof WorkspacePanelModel) {
							this.props.engine.setFullscreenModel(this.props.model);
						}
					}
				}}
				onDragStart={(event) => {
					this.setState({dragging: true});
					event.dataTransfer.setData(DraggableWidget.WORKSPACE_MIME, JSON.stringify(this.props.model.toArray()));
					this.props.engine.setDraggingNode(this.props.model)
				}}
				onDragEnd={(event) => {
					this.setState({dragging: false});
					this.props.engine.setDraggingNode(null);
				}}
				{...this.props}
			>
				{
					this.props.children
				}
			</div>
		);
	}
}
