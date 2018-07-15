import * as React from "react";
import {DraggableWidget} from "./DraggableWidget";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";
import {WorkspaceTabbedModel} from "../models/WorkspaceTabbedModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {DropZoneWidget} from "./DropZoneWidget";
import {AbstractWorkspaceCollectionModel} from "../models/AbstractWorkspaceCollectionModel";
import {BaseWidget, BaseWidgetProps} from "@projectstorm/react-core";

export interface TabButtonWidgetProps extends BaseWidgetProps{
	model: WorkspacePanelModel;
	engine: WorkspaceEngine;
}

export interface TabButtonWidgetState {
	shiftLeft: boolean;
	shiftRight: boolean;
}

export class TabButtonWidget extends BaseWidget<TabButtonWidgetProps, TabButtonWidgetState> {

	constructor(props: TabButtonWidgetProps) {
		super('srw-tab',props);
		this.state = {
			shiftLeft: false,
			shiftRight: false
		}
	}

	render() {
		let parent = (this.props.model.parent as WorkspaceTabbedModel);

		return (
			<DraggableWidget
				{...this.getProps({
					'--shift-left': this.state.shiftLeft,
					'--shift-right': !parent.isLastModel(this.props.model) && this.state.shiftRight
				})}
				onClick={() => {
					(this.props.model.parent as WorkspaceTabbedModel).setSelected(this.props.model)
					this.props.engine.fireRepaintListeners();
				}}
				engine={this.props.engine}
				model={this.props.model}
			>
				{
					this.props.engine.getFactory(this.props.model).generatePanelTab(
						this.props.model,
						this.props.model.id === parent.getSelected().id
					)
				}
				{
					this.props.engine.draggingNode && this.props.engine.draggingNode.id !== this.props.model.id &&
						<>
							<DropZoneWidget dropped={(model) => {
								if(model instanceof AbstractWorkspaceCollectionModel){
									model.getFlattened().forEach((child) => {
										parent.addModelBefore(this.props.model, child);
										parent.setSelected(child);
									})
								}else if(model instanceof WorkspacePanelModel){
									parent.addModelBefore(this.props.model, model);
									parent.setSelected(model);
								}
							}} engine={this.props.engine} hover={(entered) => {
								this.setState({shiftLeft: entered});
							}} baseClass={this.bem(['__dropzone','--left'])}/>
							<DropZoneWidget dropped={(model) => {
								if(model instanceof AbstractWorkspaceCollectionModel){
									model.getFlattened().forEach((child) => {
										parent.addModelAfter(this.props.model, child);
										parent.setSelected(child);
									})
								}else if(model instanceof WorkspacePanelModel){
									parent.addModelAfter(this.props.model, model);
									parent.setSelected(model);
								}
							}} engine={this.props.engine} hover={(entered) => {
								this.setState({shiftRight: entered});
							}} baseClass={this.bem(['__dropzone','--right'])} />
						</>
				}
			</DraggableWidget>
		);
	}
}
