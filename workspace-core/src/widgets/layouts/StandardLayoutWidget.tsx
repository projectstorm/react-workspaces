import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';
import { WorkspaceNodeModel } from '../../entities/node/WorkspaceNodeModel';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?: any;
}

export class StandardLayoutWidget extends React.Component<StandardLayoutWidgetProps> {
	render() {
		return (
			<DirectionalLayoutWidget
				dimensionContainerForDivider={(index: number) => {
					return this.props.node.r_divisons[index];
				}}
				className={this.props.className}
				data={this.props.node.children}
				generateElement={(model) => {
					return this.props.engine.getFactory(model).generateContent({
						model: model,
						engine: this.props.engine,
						renderContentOnly: false
					});
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
