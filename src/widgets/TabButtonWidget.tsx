import * as React from "react";
import {DraggableWidget} from "./DraggableWidget";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";
import {WorkspaceTabbedModel} from "../models/WorkspaceTabbedModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {DropZoneWidget} from "./DropZoneWidget";
import {AbstractWorkspaceCollectionModel} from "../models/AbstractWorkspaceCollectionModel";

export interface TabButtonWidgetProps {
	model: WorkspacePanelModel;
	engine: WorkspaceEngine;
}

export interface TabButtonWidgetState {
	shiftLeft: boolean;
	shiftRight: boolean;
}

export class TabButtonWidget extends React.Component<TabButtonWidgetProps, TabButtonWidgetState> {

	constructor(props: TabButtonWidgetProps) {
		super(props);
		this.state = {
			shiftLeft: false,
			shiftRight: false
		}
	}

	render() {
		let parent = (this.props.model.parent as WorkspaceTabbedModel);

		return (
			<DraggableWidget
				className={
					"srw-tab " +
					(this.state.shiftLeft ? "srw-tab--shift-left " : '') +
					(!parent.isLastModel(this.props.model) && this.state.shiftRight ? "srw-tab--shift-right " : '')
				}
				onClick={() => {
					(this.props.model.parent as WorkspaceTabbedModel).setSelected(this.props.model)
					this.props.engine.fireRepaintListeners();
				}}
				engine={this.props.engine}
				model={this.props.model}
			>
				{
					this.props.engine.getFactory(this.props.model).generatePanelTab({
						engine: this.props.engine,
						model: this.props.model,
						selected: this.props.model.id === parent.getSelected().id
					})
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
							}} baseClass="srw-tab__dropzone" className="srw-tab--left"/>
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
							}} baseClass="srw-tab__dropzone" className="srw-tab--right" />
						</>
				}
			</DraggableWidget>
		);
	}
}
