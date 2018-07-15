import * as React from "react";
import * as ReactDOM from "react-dom";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";
import {PanelWidget} from "./PanelWidget";
import {WorkspaceEngine} from "../WorkspaceEngine";
import * as PropTypes from 'prop-types';
import {BaseWidget, BaseWidgetProps} from "@projectstorm/react-core";

export interface FloatingPanelWidgetProps extends BaseWidgetProps{
	model: WorkspacePanelModel;
	engine: WorkspaceEngine;
	relativeElement: HTMLDivElement;
}

export interface FloatingPanelWidgetState {
	mustRepaint: boolean;
}

export class FloatingPanelWidget extends BaseWidget<FloatingPanelWidgetProps, FloatingPanelWidgetState> {

	static contextTypes = {
		workspace: PropTypes.any
	};

	constructor(props: FloatingPanelWidgetProps) {
		super('srw-floating-panel',props);
		this.state = {
			mustRepaint: false
		}
	}

	getContent() {

		let relativePosition = this.context.workspace.getRelativePosition(this.props.relativeElement);

		let style: any = {
			top: relativePosition.top,
		};
		if (this.context.workspace.isRight(this.props.relativeElement)) {
			style['right'] = this.context.workspace.floatingContainer.offsetWidth - relativePosition.left
		} else {
			style['left'] = relativePosition.left + this.props.relativeElement.offsetWidth
		}

		return (
			<div {...this.getProps()} style={style}>
				<PanelWidget model={this.props.model} engine={this.props.engine}/>
			</div>
		);
	}

	render() {
		return (this.props.relativeElement && this.context.workspace) ?
			ReactDOM.createPortal(this.getContent(), this.context.workspace.floatingContainer) : null
	}
}
