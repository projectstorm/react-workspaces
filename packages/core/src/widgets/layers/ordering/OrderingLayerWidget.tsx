import * as React from 'react';
import styled from '@emotion/styled';
import { OrderingLayer } from './OrderingLayer';
import { DimensionTrackingWidget } from '../../primitives/DimensionTrackingWidget';
import { DimensionContainer } from '../../../core/dimensions/DimensionContainer';
import { useDragOverModel } from '../../hooks/dnd-model/useDragOverModel';
import { useRef } from 'react';
import { useMouseDragEvents } from '../../hooks/dnd/useMouseDragEvents';
import { useDroppableModel } from '../../hooks/dnd-model/useDraggableModel';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';

export interface OrderingLayerWidgetDividerProps {
	layer: OrderingLayer;
	dimension: DimensionContainer;
	index: number;
	engine: WorkspaceEngine;
}

export const OrderingLayerWidgetDivider: React.FC<OrderingLayerWidgetDividerProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	useMouseDragEvents({
		forwardRef: ref,
		mouseEnter: () => {
			props.layer.zoneEntered(props.index);
		},
		mouseExit: () => {
			props.layer.zoneEntered(null);
		}
	});
	useDroppableModel({
		engine: props.engine,
		forwardRef: ref,
		onDrop: (model) => {
			props.layer.dropped(model, props.index);
		}
	});
	return (
		<DimensionTrackingWidget dimension={props.dimension}>
			<S.Container ref={ref}></S.Container>
		</DimensionTrackingWidget>
	);
};

export interface OrderingLayerWidgetProps {
	layer: OrderingLayer;
	engine: WorkspaceEngine;
}

export const OrderingLayerWidget: React.FC<OrderingLayerWidgetProps> = (props) => {
	return (
		<>
			{props.layer.trackers.map((c, index) => {
				return (
					<OrderingLayerWidgetDivider
						engine={props.engine}
						index={index}
						key={c.id}
						dimension={c}
						layer={props.layer}
					/>
				);
			})}
		</>
	);
};
namespace S {
	export const Container = styled.div`
		position: absolute;
		top: -5px;
		bottom: -5px;
		left: -5px;
		right: -5px;
		//background: mediumpurple;
		pointer-events: all;
	`;
}
