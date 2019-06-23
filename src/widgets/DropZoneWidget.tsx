import * as React from "react";
import {DraggableWidget} from "./DraggableWidget";
import {AbstractWorkspaceModel} from "../models/AbstractWorkspaceModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';

export interface DropZoneWidgetProps extends BaseWidgetProps{
	dropped?: (model: AbstractWorkspaceModel) => any;
	hover?: (entered: boolean) => any;
	engine: WorkspaceEngine;
}

export interface DropZoneWidgetState {
	hoverActive: boolean;
}

export class DropZoneWidget extends BaseWidget<DropZoneWidgetProps, DropZoneWidgetState> {

	constructor(props: DropZoneWidgetProps) {
		super('srw-drop-zone',props);
		this.state = {
			hoverActive: false
		}
	}

	render() {
		return (
			<div
				{...this.getProps({
					'--active': this.state.hoverActive
				})}
				onDrop={(event) => {
					var data = event.dataTransfer.getData(DraggableWidget.WORKSPACE_MIME);
					try{
						let object = JSON.parse(data);
						if(object.id === this.props.engine.draggingNode.id){
							// remove the model because we are going to transfer it to a different parent
							this.props.engine.draggingNode.parent.removeModel(this.props.engine.draggingNode);

							this.props.dropped && this.props.dropped(this.props.engine.draggingNode);
						}
					}catch(ex){
						console.log("could not restore draggable payload", ex);
					}
					this.setState({hoverActive: false});
					this.props.hover && this.props.hover(false);
				}}
				onDragOver={(event) => {
					for( var i = 0; i < event.dataTransfer.types.length; ++i ) {
						if(event.dataTransfer.types[i] === DraggableWidget.WORKSPACE_MIME){
							event.preventDefault();
							event.dataTransfer.dropEffect = "move";
						}
					}
				}}
				onDragLeave={() => {
					this.setState({hoverActive: false});
					this.props.hover && this.props.hover(false);
				}}
				onDragEnter={(event) => {
					this.setState({hoverActive: true});
					this.props.hover && this.props.hover(true);
				}}
			/>
		);
	}
}
