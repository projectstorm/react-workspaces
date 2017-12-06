import * as React from "react";
import {DropZoneWidget} from "./DropZoneWidget";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {AbstractWorkspaceModel} from "../models/AbstractWorkspaceModel";
import {WorkspaceNodeModel} from "../models/WorkspaceNodeModel";

export type ContainerWidgetPositions = 'top'|'left'|'bottom'|'right';

export interface ContainerWidgetProps {
	engine: WorkspaceEngine;
	model: AbstractWorkspaceModel;
	hide?: string[];
}

export interface ContainerWidgetState {
}

export class ContainerWidget extends React.Component<ContainerWidgetProps, ContainerWidgetState> {

	constructor(props: ContainerWidgetProps) {
		super(props);
		this.state = {}
	}

	renderDropZone(position: ContainerWidgetPositions) {
		if (Array.isArray(this.props.hide) && this.props.hide.indexOf(position) !== -1) {
			return;
		}
		return (
			<DropZoneWidget
				engine={this.props.engine}
				className={"srw-container__" + position}
				dropped={(model) => {
					if(position === 'top' || position == 'left'){
						this.props.model.parent.addModelBefore(this.props.model, model);
					}
					else{
						this.props.model.parent.addModelAfter(this.props.model, model);
					}
				}}
			/>
		);
	}

	render() {
		return (
			this.props.engine.draggingNode && this.props.engine.draggingNode.id !== this.props.model.id ?
				<div className="srw-container">
					{this.renderDropZone('left')}
					{this.renderDropZone('right')}
					{this.renderDropZone('top')}
					{this.renderDropZone('bottom')}
				</div> : null
		);
	}
}
