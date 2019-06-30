import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { DraggableWidget } from './DraggableWidget';
import { WorkspacePanelFactory } from '../WorkspacePanelFactory';
import { WorkspaceModel } from '../models/WorkspaceModel';

export interface PanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export interface PanelWidgetState {}

export class PanelWidget extends React.Component<PanelWidgetProps, PanelWidgetState> {
	constructor(props: PanelWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		let factory = this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model);
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
