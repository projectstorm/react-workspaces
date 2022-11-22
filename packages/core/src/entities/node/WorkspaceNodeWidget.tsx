import * as React from 'react';
import styled from '@emotion/styled';
import { StandardLayoutWidget } from '../../widgets/layouts/StandardLayoutWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceNodeFactory, WorkspaceNodePanelRenderer } from './WorkspaceNodeFactory';
import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { useModelElement } from '../../widgets/hooks/useModelElement';

export interface WorkspaceNodeWidgetProps {
	engine: WorkspaceEngine;
	factory: WorkspaceNodeFactory;
	model: WorkspaceNodeModel;
}

export const WorkspaceNodeWidget: React.FC<WorkspaceNodeWidgetProps> = (props) => {
	return (
		<StandardLayoutWidget
			node={props.model}
			engine={props.engine}
			generateElement={(m) => {
				return (
					<WorkspaceNodePanelWidget model={m} renderer={props.factory.getRendererForModel(m)} engine={props.engine} />
				);
			}}
		/>
	);
};

export interface WorkspaceNodePanelWidgetProps {
	model: WorkspaceModel;
	renderer: WorkspaceNodePanelRenderer;
	engine: WorkspaceEngine;
}

export const WorkspaceNodePanelWidget: React.FC<WorkspaceNodePanelWidgetProps> = (props) => {
	const factory = props.engine.getFactory(props.model);

	const ref = useModelElement({
		model: props.model,
		engine: props.engine
	});
	return (
		<S.Container ref={ref}>
			{props.renderer ? (
				<DraggableWidget model={props.model} engine={props.engine}>
					{props.renderer.renderTitleBar({
						engine: props.engine,
						model: props.model
					})}
				</DraggableWidget>
			) : null}
			<S.Content>
				{factory.generateContent({
					model: props.model,
					engine: props.engine
				})}
			</S.Content>
		</S.Container>
	);
};
namespace S {
	export const Container = styled.div`
		display: flex;
		flex-direction: column;
		position: relative;
		max-height: 100%;
		height: 100%;
		width: 100%;
		overflow: hidden;
	`;

	export const Content = styled.div`
		flex-grow: 1;
		display: flex;
		max-height: 100%;
		overflow: hidden;
	`;
}