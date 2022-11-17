import * as React from 'react';
import styled from '@emotion/styled';
import { Layer, LayerManager } from './LayerManager';
import { useEffect } from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { useForceUpdate } from '../hooks/useForceUpdate';

export interface LayerWidgetProps {
	layer: Layer;
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	index: number;
}

export const LayerWidget: React.FC<LayerWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.layer.registerListener({
			repaint: () => {
				forceUpdate();
			}
		});
	}, []);
	return (
		<S.Layer $pointerEvents={props.layer.options.mouseEvents} index={props.index}>
			{props.layer.renderLayer({
				engine: props.engine,
				model: props.model
			})}
		</S.Layer>
	);
};

export interface LayerManagerWidgetProps {
	layerManager: LayerManager;
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	className?: any;
}

export const LayerManagerWidget: React.FC<LayerManagerWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.layerManager.registerListener({
			layersChanged: () => {
				forceUpdate();
			}
		});
	}, []);
	return (
		<S.Container className={props.className}>
			{props.layerManager.layers.map((l, index) => {
				return <LayerWidget {...props} layer={l} index={index} key={l.id} />;
			})}
		</S.Container>
	);
};

namespace S {
	export const Container = styled.div`
		position: absolute;
		pointer-events: none;
	`;

	export const Layer = styled.div<{ index: number; $pointerEvents: boolean }>`
		z-index: ${(p) => p.index};
		pointer-events: ${(p) => (p.$pointerEvents ? 'all' : 'none')};
		width: 100%;
		height: 100%;
	`;
}
