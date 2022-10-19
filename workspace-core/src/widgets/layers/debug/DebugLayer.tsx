import { Layer } from '../LayerManager';
import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../../../core-models/WorkspaceCollectionModel';
import { Dimension } from '../../../core/DimensionContainer';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useEffect } from 'react';

export class DebugLayer extends Layer {
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
					return <PanelDebugWidget model={m} />;
				})}
		</>
	);
};

export const PanelDebugWidget: React.FC<{ model: WorkspaceModel }> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const l1 = props.model.r_dimensions.registerListener({
			updated: () => {
				forceUpdate();
			}
		});
		const l2 = props.model.registerListener({
			visibilityChanged: () => {
				forceUpdate();
			}
		});

		return () => {
			l1();
			l2();
		};
	}, [props.model]);

	if (!props.model.r_visible) {
		return null;
	}
	return <S.Container d={props.model.r_dimensions.dimensions} />;
};

namespace S {
	export const Container = styled.div<{ d: Dimension }>`
		position: absolute;
		width: ${(p) => p.d.width}px;
		height: ${(p) => p.d.height}px;
		top: ${(p) => p.d.top}px;
		left: ${(p) => p.d.left}px;
		border: solid red 1px;
	`;
}
