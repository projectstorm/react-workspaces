import * as React from 'react';
import styled from '@emotion/styled';
import { LayerManager } from './LayerManager';
import { useEffect } from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export interface LayerManagerWidgetProps {
	layerManager: LayerManager;
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	className?: any;
}

export const LayerManagerWidget: React.FC<LayerManagerWidgetProps> = (props) => {
	useEffect(() => {
		return props.layerManager.registerListener({
			layersChanged: () => {}
		});
	}, []);
	return (
		<S.Container className={props.className}>
			{props.layerManager.layers.map((l, index) => {
				return (
					<S.Layer index={index} key={l.id}>
						{l.renderLayer({
							engine: props.engine,
							model: props.model
						})}
					</S.Layer>
				);
			})}
		</S.Container>
	);
};
namespace S {
	export const Container = styled.div`
		position: absolute;
		pointer-events: none;
	`;

	export const Layer = styled.div<{ index: number }>`
		z-index: ${(p) => p.index};
		pointer-events: none;
		width: 100%;
		height: 100%;
	`;
}
