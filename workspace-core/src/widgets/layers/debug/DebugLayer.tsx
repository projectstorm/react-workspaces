import { Layer } from '../LayerManager';
import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../../../core-models/WorkspaceCollectionModel';
import { DimensionTrackingWidget } from '../../primitives/DimensionTrackingWidget';

export class DebugLayer extends Layer {
	constructor() {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <DebugLayerWidget engine={event.engine} model={event.model} />;
	}
}

export interface DebugLayerWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
}

export const DebugLayerWidget: React.FC<DebugLayerWidgetProps> = (props) => {
	return (
		<>
			{props.model
				.flatten()
				.filter((p) => !(p instanceof WorkspaceCollectionModel))
				.map((m) => {
					return <DimensionTrackingWidget model={m} />;
				})}
		</>
	);
};

namespace S {
	export const Container = styled(DimensionTrackingWidget)`
		box-sizing: border-box;
		border: solid red 1px;
	`;
}
