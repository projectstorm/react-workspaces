import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceNodeModel } from '../../models/node/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { PanelWidget } from '../PanelWidget';
import { TabGroupWidget } from '../tabs/TabGroupWidget';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TrayWidget } from '../TrayWidget';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { DropZoneWidget } from '../DropZoneWidget';
import { WorkspaceModel } from '../../models/WorkspaceModel';

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
		} else {
			return <PanelWidget key={model.id} engine={this.props.engine} model={model} />;
		}
	}

	getClassName() {
		return super.getClassName() + ' ' + this.bem(this.props.node.vertical ? '--vertical' : '--horizontal');
	}

	render() {
		return (
			<div {...this.getProps()}>
				<DropZoneWidget
					vertical={!this.props.node.vertical}
					disallow={
						this.props.node.children[0].id === this.props.engine.draggingID ||
						this.props.node.children[0].hasParentID(this.props.engine.draggingID)
					}
					dropped={model => {
						this.props.node.addModel(model, 0);
					}}
					parent={this.props.node}
					engine={this.props.engine}
					key="drop-first"
				/>
				{_.map(this.props.node.children, (model, index) => {
					let disallow = false;

					if (model.id === this.props.engine.draggingID) {
						disallow = true;
					}
					if (
						index < this.props.node.children.length - 2 &&
						this.props.node.children[index + 1].id === this.props.engine.draggingID
					) {
						disallow = true;
					}
					return (
						<>
							{this.generateElement(model)}
							<DropZoneWidget
								key={`drop-${model.id}`}
								vertical={!this.props.node.vertical}
								disallow={disallow || model.hasParentID(this.props.engine.draggingID)}
								dropped={droppedModel => {
									this.props.node.addModel(droppedModel, index + 1);
								}}
								parent={this.props.node}
								engine={this.props.engine}
							/>
						</>
					);
				})}
			</div>
		);
	}
}
