import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Alignment } from '@projectstorm/react-workspaces-core';
import { useMouseDragEvents } from '@projectstorm/react-workspaces-core';

export interface DropZoneAlignmentButtonWidgetProps {
	alignment: Alignment;
}

const SPLIT_THICK = 13;
const SPLIT_LENGTH = 60;
const SPLIT_MARGIN = 8;

export const DropZoneAlignmentButtonWidget: React.FC<DropZoneAlignmentButtonWidgetProps> = (props) => {
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

	let width = SPLIT_THICK;
	let height = SPLIT_LENGTH;
	if (props.alignment === Alignment.TOP || props.alignment === Alignment.BOTTOM) {
		width = SPLIT_LENGTH;
		height = SPLIT_THICK;
	}

	return <S.SplitContainer ref={ref} alignment={props.alignment} hover={entered} width={width} height={height} />;
};

namespace S {
	export const SplitContainer = styled.div<{ width: number; height: number; alignment: Alignment; hover: boolean }>`
		border-radius: 2px;
		background: ${(p) => (p.hover ? 'orange' : '#0096ff')};
		position: absolute;
		pointer-events: all;

		width: ${(p) => p.width}px;
		height: ${(p) => p.height}px;
		${(p) => p.alignment}: ${SPLIT_MARGIN}px;
	`;
}
