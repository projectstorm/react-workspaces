import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';
import { WorkspaceNodeModel } from '../../entities/node/WorkspaceNodeModel';
import { useModelElement } from '../hooks/useModelElement';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?: any;
}

export const StandardLayoutWidget: React.FC<StandardLayoutWidgetProps> = (props) => {
	const ref = useModelElement({
		engine: props.engine,
		model: props.node
	});
	return (
		<DirectionalLayoutWidget
			forwardRef={ref}
			dimensionContainerForDivider={(index: number) => {
				return props.node.r_divisons[index];
			}}
			className={props.className}
			data={props.node.children}
			generateElement={(model) => {
				return props.engine.getFactory(model).generateContent({
					model: model,
					engine: props.engine,
					renderContentOnly: false,
					verticalLayout: props.node.vertical
				});
			}}
			expand={true}
			dropZoneAllowed={(index) => {
				return true;
			}}
			dropped={(index, model: WorkspaceModel) => {
				props.node.addModel(model, index);
				props.engine.fireModelUpdated();
			}}
			vertical={props.node.vertical}
			engine={props.engine}
		/>
	);
};
