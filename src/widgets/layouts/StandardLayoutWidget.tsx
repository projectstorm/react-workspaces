import * as React from 'react';
import { WorkspaceNodeModel } from '../../entities/tray/WorkspaceNodeModel';
import { WorkspaceTabbedModel } from '../../entities/tabs/WorkspaceTabbedModel';
import { PanelWidget } from '../../entities/panel/PanelWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';
import { WorkspaceLayoutFactory } from '../../core/WorkspaceLayoutFactory';
import { WorkspaceCollectionModel } from '../../core-models/WorkspaceCollectionModel';
import styled from '@emotion/styled';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?;
}

namespace S {
	export const DirectionalLayout = styled(DirectionalLayoutWidget)<{ halveWidth: boolean }>`
		${(p) => (p.halveWidth ? 'width: 50%' : '')};
	`;
}

export class StandardLayoutWidget extends React.Component<StandardLayoutWidgetProps> {
	getWrapper<T extends WorkspaceModel>(model: T, vertical: boolean, getContent: (model: T) => JSX.Element) {
		return (
			<S.DirectionalLayout
				data={[model]}
				generateElement={getContent}
				expand={model.expandHorizontal}
				engine={this.props.engine}
				vertical={vertical}
				key={model.id}
				halveWidth={!this.props.node.vertical && model.expandHorizontal}
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
	}
	generateElement(model: WorkspaceModel) {
		if (model instanceof WorkspaceTabbedModel) {
			if (!this.props.node.parent) {
				return this.getWrapper(model, true, (model) => {
					return this.props.engine.getFactory<WorkspaceLayoutFactory>(model).generateLayout({
						model: model as any,
						engine: this.props.engine
					});
				});
			}
		}

		if (model instanceof WorkspaceCollectionModel) {
			return this.props.engine.getFactory<WorkspaceLayoutFactory>(model).generateLayout({
				model: model,
				engine: this.props.engine
			});
		}

		if (!this.props.node.parent) {
			return this.getWrapper(model, !this.props.node.vertical, (model) => {
				return <PanelWidget key={model.id} engine={this.props.engine} model={model} expand={true} />;
			});
		}

		return (
			<PanelWidget
				key={model.id}
				engine={this.props.engine}
				model={model}
				expand={this.props.node.vertical ? model.expandVertical : model.expandHorizontal}
			/>
		);
	}

	render() {
		if (!this.props.node) {
			return null;
		}
		return (
			<DirectionalLayoutWidget
				className={this.props.className}
				data={this.props.node.children}
				generateElement={(model) => {
					return this.generateElement(model);
				}}
				expand={true}
				dropZoneAllowed={(index) => {
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
