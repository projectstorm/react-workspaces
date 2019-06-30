import * as React from 'react';
import { WorkspaceNodeModel } from '../models/WorkspaceNodeModel';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { StandardLayoutWidget } from './layouts/StandardLayoutWidget';
import { MicroLayoutWidget } from './layouts/MicroLayoutWidget';
import { ContainerWidget } from './ContainerWidget';
import { DraggableWidget } from './DraggableWidget';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';

export interface TrayWidgetProps extends BaseWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	root?: boolean;
}

export interface TrayWidgetState {}

export class TrayWidget extends BaseWidget<TrayWidgetProps, TrayWidgetState> {
	constructor(props: TrayWidgetProps) {
		super('srw-tray', props);
		this.state = {};
	}

	getHeader() {
		let header = this.props.engine.getTrayHeader(this.props.node);
		if (header) {
			return (
				<DraggableWidget model={this.props.node} engine={this.props.engine}>
					{header}
				</DraggableWidget>
			);
		}
		return null;
	}

	render() {
		const expand = this.props.node.expand && this.props.node.mode === 'expand';
		return (
			<div
				{...this.getProps({
					'--expand': expand,
					'--collapse': !expand
				})}>
				{!this.props.root && this.getHeader()}
				{this.props.node.mode === 'micro' ? (
					<MicroLayoutWidget node={this.props.node} engine={this.props.engine} />
				) : (
					<StandardLayoutWidget node={this.props.node} engine={this.props.engine} />
				)}
				{!this.props.root &&
					(this.props.node.vertical ? (
						<ContainerWidget engine={this.props.engine} model={this.props.node} hide={['top', 'bottom']} />
					) : (
						<ContainerWidget engine={this.props.engine} model={this.props.node} hide={['left', 'right']} />
					))}
			</div>
		);
	}
}
