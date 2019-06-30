import * as React from 'react';
import { WorkspacePanelModel } from '../models/WorkspacePanelModel';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { ContainerWidget } from './ContainerWidget';
import { DraggableWidget } from './DraggableWidget';

export interface PanelWidgetProps {
	model: WorkspacePanelModel;
	engine: WorkspaceEngine;
}

export interface PanelWidgetState {}

export class PanelWidget extends React.Component<PanelWidgetProps, PanelWidgetState> {
	constructor(props: PanelWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		let factory = this.props.engine.getFactory(this.props.model);
		return (
			<div className={'srw-panel srw-panel--' + (this.props.model.expand ? 'expand' : 'contract')}>
				<DraggableWidget className="srw-panel__title" model={this.props.model} engine={this.props.engine}>
					{factory.generatePanelTitle({
						model: this.props.model,
						engine: this.props.engine
					})}
				</DraggableWidget>
				<div className="srw-panel__content">
					{factory.generatePanelContent({
						model: this.props.model,
						engine: this.props.engine
					})}
				</div>
			</div>
		);
	}
}
