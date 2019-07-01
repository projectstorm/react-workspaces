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

	expand() {
		if (this.props.expand != null) {
			return this.props.expand;
		}
		return this.props.model.expand;
	}

	render() {
		let factory = this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model);
		const expand = this.expand();
		return (
			<div
				{...this.getProps({
					'--expand': expand,
					'--contract': !expand
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
