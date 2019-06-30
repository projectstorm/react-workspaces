import * as React from 'react';
import * as _ from 'lodash';
import { WorkspacePanelModel } from '../../models/WorkspacePanelModel';
import { WorkspaceNodeModel } from '../../models/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../models/WorkspaceTabbedModel';
import { PanelWidget } from '../PanelWidget';
import { TabGroupWidget } from '../TabGroupWidget';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TrayWidget } from '../TrayWidget';
import { AbstractWorkspaceModel } from '../../models/AbstractWorkspaceModel';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';

export interface StandardLayoutWidgetProps extends BaseWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
}

export class StandardLayoutWidget extends BaseWidget<StandardLayoutWidgetProps> {
	constructor(props: StandardLayoutWidgetProps) {
		super('srw-standard-layout', props);
		this.state = {};
	}

	generateElement(model: AbstractWorkspaceModel) {
		if (model instanceof WorkspacePanelModel) {
			return <PanelWidget key={model.id} engine={this.props.engine} model={model} />;
		} else if (model instanceof WorkspaceNodeModel) {
			return <TrayWidget key={model.id} node={model} engine={this.props.engine} />;
		} else if (model instanceof WorkspaceTabbedModel) {
			return <TabGroupWidget key={model.id} model={model} engine={this.props.engine} />;
		} else {
			return;
		}
	}

	getClassName() {
		return super.getClassName() + ' ' + this.bem(this.props.node.vertical ? '--vertical' : '--horizontal');
	}

	render() {
		return (
			<div {...this.getProps()}>
				{_.map(this.props.node.children, model => {
					return this.generateElement(model);
				})}
			</div>
		);
	}
}
