import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PanelWidget } from '../entities/panel/PanelWidget';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import { WorkspaceModel } from '../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { useForceUpdate } from './hooks/useForceUpdate';
import { useWindowResize } from './hooks/useWindowResize';

export interface FloatingPanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	relativeElement: HTMLDivElement;
}

namespace S {
	export const Container = styled.div`
		position: absolute;
		background-color: black;
		pointer-events: all;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		transition: top 0.3s, left 0.3s;
		display: flex;
		z-index: 1;
	`;
}

export const FloatingPanelWidget: React.FC<FloatingPanelWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate();
	useWindowResize({
		resized: forceUpdate
	});

	const engine = props.engine;
	let relativePosition = engine.floatingContainer.getRelativeElementPosition(props.relativeElement);

	let style: any = {
		top: relativePosition.top,
		maxHeight: engine.workspaceContainer.dimensions.height - relativePosition.top
	};
	if (engine.floatingContainer.isRight(props.relativeElement)) {
		style['right'] = engine.floatingContainer.dimensions.width - relativePosition.left;
	} else {
		style['left'] = relativePosition.left + props.relativeElement.offsetWidth;
	}

	return ReactDOM.createPortal(
		<S.Container style={style}>
			<PanelWidget model={props.model} engine={props.engine} />
		</S.Container>,
		props.engine.floatingContainerRef.current
	);
};
