import * as React from "react";
import {DropZoneWidget} from "./DropZoneWidget";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {AbstractWorkspaceModel} from "../models/AbstractWorkspaceModel";
import {WorkspaceNodeModel} from "../models/WorkspaceNodeModel";
import {BaseWidget, BaseWidgetProps} from "@projectstorm/react-core";

export type ContainerWidgetPositions = 'top'|'left'|'bottom'|'right';

export interface ContainerWidgetProps extends BaseWidgetProps{
	engine: WorkspaceEngine;
	model: AbstractWorkspaceModel;
	hide?: string[];
}

export interface ContainerWidgetState {
}

export class ContainerWidget extends BaseWidget<ContainerWidgetProps, ContainerWidgetState> {

	constructor(props: ContainerWidgetProps) {
		super('srw-container',props);
		this.state = {}
	}

	renderDropZone(position: ContainerWidgetPositions) {
		if (Array.isArray(this.props.hide) && this.props.hide.indexOf(position) !== -1) {
			return;
		}
		return (
			<DropZoneWidget
				engine={this.props.engine}
				className={this.bem('__'+position)}
				dropped={(model) => {
					if(this.props.model.parent instanceof WorkspaceNodeModel){
						if(!this.props.model.parent.vertical){
							if (position === 'left') {
								this.props.model.parent.addModelBefore(this.props.model, model);
							}
							else if (position === 'right') {
								this.props.model.parent.addModelAfter(this.props.model, model);
							}
							else if(position === 'top'){
								this.props.model.parent.replaceModel(this.props.model, (new WorkspaceNodeModel())
									.setVertical(true)
									.addModel(model)
									.addModel(this.props.model)
								)
							}else{
								this.props.model.parent.replaceModel(this.props.model, (new WorkspaceNodeModel())
									.setVertical(true)
									.addModel(this.props.model)
									.addModel(model)
								)
							}
						}else{
							if (position === 'top') {
								this.props.model.parent.addModelBefore(this.props.model, model);
							}
							else if (position === 'bottom') {
								this.props.model.parent.addModelAfter(this.props.model, model);
							}
							else if(position === 'left'){
								this.props.model.parent.replaceModel(this.props.model, (new WorkspaceNodeModel())
									.setHorizontal(true)
									.addModel(model)
									.addModel(this.props.model)
								)
							}else{
								this.props.model.parent.replaceModel(this.props.model, (new WorkspaceNodeModel())
									.setHorizontal(true)
									.addModel(this.props.model)
									.addModel(model)
								)
							}
						}
					}else {
						if (position === 'top' || position == 'left') {
							this.props.model.parent.addModelBefore(this.props.model, model);
						}
						else {
							this.props.model.parent.addModelAfter(this.props.model, model);
						}
					}
				}}
			/>
		);
	}

	render() {
		return (
			this.props.engine.draggingNode && this.props.engine.draggingNode.id !== this.props.model.id ?
				<div {...this.getProps()}>
					{this.renderDropZone('left')}
					{this.renderDropZone('right')}
					{this.renderDropZone('top')}
					{this.renderDropZone('bottom')}
				</div> : null
		);
	}
}
