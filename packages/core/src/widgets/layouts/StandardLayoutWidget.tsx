import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { DirectionalLayoutWidget } from './DirectionalLayoutWidget';
import { WorkspaceNodeModel } from '../../entities/node/WorkspaceNodeModel';
import { useModelElement } from '../hooks/useModelElement';
import styled from '@emotion/styled';

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?: any;
	generateElement: (model: WorkspaceModel) => JSX.Element;
}

export const StandardLayoutWidget: React.FC<StandardLayoutWidgetProps> = (props) => {
	const ref = useModelElement({
		engine: props.engine,
		model: props.node
	});
	return (
		<S.DirectionalLayout
			forwardRef={ref}
			dimensionContainerForDivider={(index: number) => {
				return props.node.r_divisons[index];
			}}
			className={props.className}
			data={props.node.children}
			generateElement={props.generateElement}
			// FIXME
			expand={true}
			dropZoneAllowed={(index) => {
				return true;
			}}
			dropped={(index, model: WorkspaceModel) => {
				props.node.addModel(model, index);
			}}
			vertical={props.node.vertical}
			engine={props.engine}
		/>
	);
};

namespace S {
	export const DirectionalLayout = styled(DirectionalLayoutWidget)`
		height: 100%;
		width: 100%;
	`;
}
