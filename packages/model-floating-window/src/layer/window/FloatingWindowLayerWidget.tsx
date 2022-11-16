import * as React from 'react';
import { useRef } from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import {
	Alignment,
	DimensionTrackingWidget,
	IPosition,
	useMouseDragDistance,
	WorkspaceEngine
} from '@projectstorm/react-workspaces-core';
import styled from '@emotion/styled';
import { FloatingWindowLayer } from './FloatingWindowLayer';
import { FloatingWindowFactory } from '../../core/FloatingWindowFactory';

export interface FloatingWindowLayerWidgetProps {
	window: FloatingWindowModel;
	engine: WorkspaceEngine;
	animate: boolean;
	layer: FloatingWindowLayer;
}

export const FloatingWindowLayerWidget: React.FC<FloatingWindowLayerWidgetProps> = (props) => {
	const factory = props.engine.getFactory(props.window.child);
	const ref = useRef<HTMLDivElement>();
	const initialPos = useRef<Pick<IPosition, Alignment.LEFT | Alignment.TOP>>({
		left: props.window.position.left,
		top: props.window.position.top
	});

	useMouseDragDistance({
		forwardRef: ref,
		startMove: () => {
			props.layer.setAnimate(false);
			initialPos.current = {
				top: props.window.position.top,
				left: props.window.position.left
			};
		},
		moved: ({ distanceX, distanceY }) => {
			props.window.position.update({
				left: initialPos.current.left + distanceX,
				top: initialPos.current.top + distanceY
			});
		},
		endMove: () => {
			props.layer.setAnimate(true);
		}
	});

	const windowFactory = props.engine.getFactory<FloatingWindowFactory>(props.window);

	return (
		<DimensionTrackingWidget animateDuration={props.animate ? 300 : 0} dimension={props.window.dimension}>
			{windowFactory.generateContent({
				content: factory.generateContent({
					engine: props.engine,
					model: props.window.child
				}),
				titlebar: <S.Title ref={ref}>Menubar</S.Title>,
				engine: props.engine,
				model: props.window
			})}
		</DimensionTrackingWidget>
	);
};
namespace S {
	export const Container = styled.div`
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
		pointer-events: all;
		border: solid 1px rgb(10, 10, 10);
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	`;

	export const Title = styled.div`
		background: rgba(0, 0, 0, 0.9);
		color: white;
		padding: 5px;
		cursor: move;
		user-select: none;
		flex-shrink: 0;
	`;
}
