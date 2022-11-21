import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { useDraggableModel } from '../hooks/dnd-model/useDraggableModel';

export interface DraggableWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
	className?: string;
	onClick?: () => any;
	forwardRef?: React.RefObject<HTMLDivElement>;
}

namespace S {
	export const Draggable = styled.div<{ draggable: boolean }>`
		cursor: ${(p) => (p.draggable ? 'move' : 'pointer')};
	`;
}

export const DraggableWidget: React.FC<React.PropsWithChildren<DraggableWidgetProps>> = (props) => {
	const ref = useRef<HTMLDivElement>();
	useDraggableModel({
		forwardRef: props.forwardRef || ref,
		model: props.model,
		engine: props.engine
	});
	return (
		<S.Draggable
			ref={props.forwardRef || ref}
			draggable={props.engine.dragAndDropEnabled}
			onDragStart={(event) => {
				props.engine.iterateListeners((list) => {
					list.draggingElement && list.draggingElement(props.model, true);
				});
			}}
			onDragEnd={(event) => {
				props.engine.iterateListeners((list) => {
					list.draggingElement && list.draggingElement(props.model, false);
				});
			}}
			{...props}
		>
			{props.children}
		</S.Draggable>
	);
};
