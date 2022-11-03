import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	DimensionContainer,
	DimensionTrackingWidget,
	useDroppableModel,
	useMouseDragEvents,
	WorkspaceEngine
} from '@projectstorm/react-workspaces-core';

export interface DropzoneDividerWidgetProps {
	dimension: DimensionContainer;
	engine: WorkspaceEngine;
}

export const DropzoneDividerWidget: React.FC<DropzoneDividerWidgetProps> = (props) => {
	const [entered, setEntered] = useState(false);
	const ref = useRef<HTMLDivElement>();
	useMouseDragEvents({
		forwardRef: ref,
		mouseEnter: () => {
			setEntered(true);
		},
		mouseExit: () => {
			setEntered(false);
		}
	});
	useDroppableModel({
		forwardRef: ref,
		engine: props.engine,
		onDrop: () => {}
	});

	const PULL_INSET = 30;
	const PULL_OUTER = 6;

	let insetsVertical = -1 * PULL_OUTER;
	let insetsHorizontal = PULL_INSET;
	if (props.dimension.isPortrait()) {
		insetsVertical = PULL_INSET;
		insetsHorizontal = -1 * PULL_OUTER;
	}

	if (entered) {
		insetsVertical = insetsVertical - 5;
		insetsHorizontal = insetsHorizontal - 5;
	}

	return (
		<S.DimensionTracker dimension={props.dimension}>
			<S.Container
				ref={ref}
				enter={entered}
				insetsVertical={insetsVertical}
				insetsHorizontal={insetsHorizontal}
			></S.Container>
		</S.DimensionTracker>
	);
};
namespace S {
	export const DimensionTracker = styled(DimensionTrackingWidget)``;

	export const Container = styled.div<{ insetsVertical: number; insetsHorizontal: number; enter: boolean }>`
		pointer-events: all;
		position: absolute;
		background: ${(p) => (p.enter ? 'orange' : '#0096ff')};
		border-radius: 5px;
		transition: background 0.3s, opacity 0.3s, left 0.3s, top 0.3s, bottom 0.3s, right 0.3s;
		transition-delay: 0.1s;
		opacity: ${(p) => (p.enter ? 1 : 0.1)};
		top: ${(p) => p.insetsVertical}px;
		left: ${(p) => p.insetsHorizontal}px;
		bottom: ${(p) => p.insetsVertical}px;
		right: ${(p) => p.insetsHorizontal}px;
		user-select: none;
	`;
}
