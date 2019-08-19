import * as React from 'react';
import { WorkspaceNodeModel } from '../../entities/tray/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../entities/tabs/WorkspaceTabbedModel';
import { PanelWidget } from '../../entities/panel/PanelWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';
import { WorkspaceLayoutFactory } from '../../core/WorkspaceLayoutFactory';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?;
}

export class StandardLayoutWidget extends React.Component<StandardLayoutWidgetProps> {
	generateElement(model: WorkspaceModel) {
		if (model instanceof WorkspaceNodeModel) {
			return this.props.engine.getFactory<WorkspaceLayoutFactory>(model).generateLayout({
				model: model,
				engine: this.props.engine
			});
		} else if (model instanceof WorkspaceTabbedModel) {
			return this.props.engine.getFactory<WorkspaceLayoutFactory>(model).generateLayout({
				model: model,
				engine: this.props.engine
			});
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
