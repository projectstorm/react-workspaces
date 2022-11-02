import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { useEffect, useRef, useState } from 'react';
import { useDroppableModel } from '../hooks/dnd-model/useDraggableModel';
import { useMouseDragEvents } from '../hooks/dnd/useMouseDragEvents';

export interface DropzoneLogicWidgetProps {
	onDrop: (model?: WorkspaceModel) => any;
	onDragEnter: (entered: boolean) => any;
	engine: WorkspaceEngine;
	className?;
}

namespace S {
	export const Container = styled.div``;
}

export const DropzoneLogicWidget: React.FC<React.PropsWithChildren<DropzoneLogicWidgetProps>> = (props) => {
	const [enter, setEnter] = useState(false);
	const ref = useRef<HTMLDivElement>();
	useDroppableModel({
		onDrop: (model) => {
			props.onDrop(model);
		},
		engine: props.engine,
		forwardRef: ref
	});
	useMouseDragEvents({
		forwardRef: ref,
		mouseEnter: () => {
			setEnter(true);
		},
		mouseExit: () => {
			setEnter(false);
		}
	});
	useEffect(() => {
		props.onDragEnter(enter);
	}, [enter]);

	return (
		<S.Container ref={ref} className={props.className}>
			{props.children}
		</S.Container>
	);
};
