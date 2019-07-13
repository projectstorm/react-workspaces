import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceNodeModel } from '../../models/node/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { PanelWidget } from '../PanelWidget';
import { TabGroupWidget } from '../tabs/TabGroupWidget';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TrayWidget } from '../TrayWidget';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { WorkspaceModel } from '../../models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';

export interface StandardLayoutWidgetProps extends BaseWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
}

export class StandardLayoutWidget extends BaseWidget<StandardLayoutWidgetProps> {
	constructor(props: StandardLayoutWidgetProps) {
		super('srw-standard-layout', props);
		this.state = {};
	}

	generateElement(model: WorkspaceModel) {
		if (model instanceof WorkspaceNodeModel) {
			return <TrayWidget key={model.id} node={model} engine={this.props.engine} />;
		} else if (model instanceof WorkspaceTabbedModel) {
			return <TabGroupWidget key={model.id} model={model} engine={this.props.engine} />;
		} else if (!this.props.node.parent) {
			return (
				<DirectionalLayoutWidget
					expand={model.expandHorizontal}
					engine={this.props.engine}
					vertical={!this.props.node.vertical}
					key={model.id}
					dropped={(index, dropped) => {
						let node = new WorkspaceNodeModel();
						node.setVertical(true);
						node.setExpand(model.expandHorizontal, true);
						node.addModel(model);
						node.addModel(dropped, index);

						this.props.node.replaceModel(model, node);
						this.props.engine.fireModelUpdated();
					}}
					dropZoneAllowed={() => {
						return true;
					}}>
					<PanelWidget engine={this.props.engine} model={model} expand={true} />
				</DirectionalLayoutWidget>
			);
		} else {
			return (
				<PanelWidget
					engine={this.props.engine}
					model={model}
					expand={this.props.node.vertical ? model.expandVertical : model.expandHorizontal}
				/>
			);
		}
	}

	render() {
		return (
			<DirectionalLayoutWidget
				{...this.getProps()}
				expand={this.props.node.shouldExpand()}
				dropZoneAllowed={index => {
					return true;
				}}
				dropped={(index, model: WorkspaceModel) => {
					this.props.node.addModel(model, index);
					this.props.engine.fireModelUpdated();
				}}
				vertical={this.props.node.vertical}
				engine={this.props.engine}>
				{_.map(this.props.node.children, (model, index) => {
					return this.generateElement(model);
				})}
			</DirectionalLayoutWidget>
		);
	}
}
