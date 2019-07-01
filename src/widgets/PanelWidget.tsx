import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { DraggableWidget } from './DraggableWidget';
import { WorkspacePanelFactory } from '../WorkspacePanelFactory';
import { WorkspaceModel } from '../models/WorkspaceModel';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';

export interface PanelWidgetProps extends BaseWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	expand?: boolean;
}

export class PanelWidget extends BaseWidget<PanelWidgetProps> {
	constructor(props: PanelWidgetProps) {
		super('srw-panel', props);
	}

	render() {
		let factory = this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model);
		return (
			<div
				{...this.getProps({
					'--expand': this.props.expand,
					'--contract': !this.props.expand
				})}>
				<DraggableWidget model={this.props.model} engine={this.props.engine}>
					{factory.generatePanelTitle({
						model: this.props.model,
						engine: this.props.engine
					})}
				</DraggableWidget>
				<div className={this.bem('__content')}>
					{factory.generatePanelContent({
						model: this.props.model,
						engine: this.props.engine
					})}
				</div>
			</div>
		);
	}
}
