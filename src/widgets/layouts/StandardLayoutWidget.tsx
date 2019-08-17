import * as React from 'react';
import { WorkspaceNodeModel } from '../../models/node/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { PanelWidget } from '../PanelWidget';
import { TabGroupWidget } from '../tabs/TabGroupWidget';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TrayWidget } from '../TrayWidget';
import { WorkspaceModel } from '../../models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?;
}

export class StandardLayoutWidget extends React.Component<StandardLayoutWidgetProps> {
	generateElement(model: WorkspaceModel) {
		if (model instanceof WorkspaceNodeModel) {
			return <TrayWidget key={model.id} node={model} engine={this.props.engine} />;
		} else if (model instanceof WorkspaceTabbedModel) {
			return <TabGroupWidget key={model.id} model={model} engine={this.props.engine} />;
		} else if (!this.props.node.parent) {
			return (
				<DirectionalLayoutWidget
					data={[model]}
					generateElement={model => {
						return <PanelWidget engine={this.props.engine} model={model} expand={true} />;
					}}
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
					}}
				/>
			);
		} else {
			return (
				<PanelWidget
					key={model.id}
					engine={this.props.engine}
					model={model}
					expand={this.props.node.vertical ? model.expandVertical : model.expandHorizontal}
				/>
			);
		}
	}

	render() {
		if (!this.props.node) {
			return null;
		}
		return (
			<DirectionalLayoutWidget
				className={this.props.className}
				data={this.props.node.children}
				generateElement={model => {
					return this.generateElement(model);
				}}
				expand={this.props.node.shouldExpand()}
				dropZoneAllowed={index => {
					return true;
				}}
				dropped={(index, model: WorkspaceModel) => {
					this.props.node.addModel(model, index);
					this.props.engine.fireModelUpdated();
				}}
				vertical={this.props.node.vertical}
				engine={this.props.engine}
			/>
		);
	}
}
