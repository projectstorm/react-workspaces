import * as React from 'react';
import { WorkspaceEngine, WorkspaceEngineError } from '../../core/WorkspaceEngine';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { WorkspacePanelFactory } from './WorkspacePanelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { PerformanceWidget } from '../../widgets/PerformanceWidget';
import { useModelElement } from '../../widgets/hooks/useModelElement';

export interface PanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	expand?: boolean;
}

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

export const PanelWidget: React.FC<PanelWidgetProps> = (props) => {
	const ref = useModelElement({
		model: props.model,
		engine: props.engine
	});
	try {
		const factory = props.engine.getFactory<WorkspacePanelFactory>(props.model);
		return (
			<S.Container ref={ref}>
				<DraggableWidget model={props.model} engine={props.engine}>
					{factory.generatePanelTitle({
						model: props.model,
						engine: props.engine
					})}
				</DraggableWidget>
				<S.Content>
					<PerformanceWidget
						key={props.model.id}
						engine={props.engine}
						data={props.model.toArray()}
						children={() => {
							return factory.generatePanelContent({
								model: props.model,
								engine: props.engine
							});
						}}
					/>
				</S.Content>
			</S.Container>
		);
	} catch (ex) {
		if ((ex as WorkspaceEngineError)._is__storm_workspaces_error_) {
			props.model.delete();
		}
		return null;
	}
};
