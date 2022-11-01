import * as React from 'react';
import { WorkspaceNodeModel } from '../entities/tray/WorkspaceNodeModel';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import { PanelWidget } from '../entities/panel/PanelWidget';
import { StandardLayoutWidget } from './layouts/StandardLayoutWidget';
import styled from '@emotion/styled';
import { DividerContext } from './dropzone/DropzoneDividerWidget';
import { useEffect, useRef, useState } from 'react';
import { useForceUpdate } from './hooks/useForceUpdate';
import { DimensionContainer } from '../core/DimensionContainer';
import { useResizeObserver } from './hooks/useResizeObserver';
import { LayerManagerWidget } from './layers/LayerManagerWidget';

export interface WorkspaceWidgetProps {
	model: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	dividerColor?: string;
	dividerColorActive?: string;
}

namespace S {
	export const Container = styled.div`
		display: flex;
		height: 100%;
		position: relative;
	`;

	export const Floating = styled.div`
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
	`;

	export const LayerManager = styled(LayerManagerWidget)`
		width: 100%;
		height: 100%;
	`;
}

export const WorkspaceWidget: React.FC<WorkspaceWidgetProps> = (props) => {
	const ref_container = useRef<HTMLDivElement>();
	const ref_floating = useRef<HTMLDivElement>();

	const timerListener = useRef(null);

	const forceUpdate = useForceUpdate();
	const [dimensionContainer] = useState(() => {
		return new DimensionContainer();
	});
	const [floatingContainer] = useState(() => {
		return new DimensionContainer();
	});

	useEffect(() => {
		props.engine.fireRepainted();
	});

	useEffect(() => {
		props.engine.setRootModel(props.model);
	}, [props.model]);

	useResizeObserver({
		forwardRef: ref_container,
		dimension: dimensionContainer
	});

	useResizeObserver({
		forwardRef: ref_floating,
		dimension: floatingContainer
	});

	useEffect(() => {
		props.engine.setWorkspaceContainer(dimensionContainer);
		props.engine.setFloatingContainer(floatingContainer);

		props.engine.floatingContainerRef = ref_floating;
		props.engine.registerListener({
			layoutInvalidated: () => {
				forceUpdate();
			},
			repaint: () => {
				forceUpdate();
			}
		});
	}, []);

	return (
		<DividerContext.Provider
			value={{
				hint: props.dividerColor,
				active: props.dividerColorActive
			}}
		>
			<S.Container
				ref={ref_container}
				onDragOver={(event) => {
					if (timerListener.current) {
						clearTimeout(timerListener.current);
						timerListener.current = null;
					}

					timerListener.current = setTimeout(() => {
						props.engine.setDraggingNode(null);
					}, 200);

					if (props.engine.draggingID) {
						return;
					}
					let id = props.engine.getDropEventModelID(event);
					props.engine.setDraggingNode(id);
				}}
			>
				{props.engine.fullscreenModel ? (
					<PanelWidget expand={true} model={props.engine.fullscreenModel} engine={props.engine} />
				) : (
					<StandardLayoutWidget node={props.model} engine={props.engine} />
				)}
				<S.Floating ref={ref_floating} />
				<S.LayerManager engine={props.engine} layerManager={props.engine.layerManager} model={props.model} />
			</S.Container>
		</DividerContext.Provider>
	);
};
