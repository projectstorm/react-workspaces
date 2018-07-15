import * as React from "react";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {ContainerWidget} from "./ContainerWidget";
import {DraggableWidget} from "./DraggableWidget";
import {BaseWidget, BaseWidgetProps} from "@projectstorm/react-core";

export interface PanelWidgetProps extends BaseWidgetProps{
	model: WorkspacePanelModel;
	engine: WorkspaceEngine;
}

export interface PanelWidgetState {
}

export class PanelWidget extends BaseWidget<PanelWidgetProps, PanelWidgetState> {

	constructor(props: PanelWidgetProps) {
		super('srw-panel',props);
		this.state = {}
	}

	render() {
		let factory = this.props.engine.getFactory(this.props.model);
		return (
			<div {...this.getProps({
				'--expand': this.props.model.expand,
				'--contract': !this.props.model.expand,
			})}>
				<DraggableWidget
					className={this.bem('__title')}
					model={this.props.model}
					engine={this.props.engine}
				>
					{factory.generatePanelTitle(this.props.model)}
				</DraggableWidget>
				<div className={this.bem('__content')}>
					{factory.generatePanelContent(this.props.model)}
				</div>
				<ContainerWidget engine={this.props.engine} model={this.props.model} />
			</div>
		);
	}
}
