import * as React from 'react';
import { useRef } from 'react';
import styled from '@emotion/styled';
import { Alignment, useMouseDragDistance } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';

export interface FloatingWindowResizeEdgeWidgetProps {
	alignment: Alignment;
	window: FloatingWindowModel;
	debug?: boolean;
	toggleAnimation: (animate: boolean) => any;
}

export const FloatingWindowResizeEdgeWidget: React.FC<FloatingWindowResizeEdgeWidgetProps> = (props) => {
	const ref = useRef();
	const left = useRef<number>(0);
	const top = useRef<number>(0);
	const width = useRef<number>(0);
	const height = useRef<number>(0);
	useMouseDragDistance({
		forwardRef: ref,
		startMove: () => {
			props.toggleAnimation(false);
			width.current = props.window.size.width;
			height.current = props.window.size.height;
			left.current = props.window.position.left;
			top.current = props.window.position.top;
		},
		moved: ({ distanceX, distanceY }) => {
			if (props.alignment === Alignment.TOP) {
				props.window.dimension.update({
					top: top.current + distanceY,
					height: height.current + -1 * distanceY
				});
			} else if (props.alignment === Alignment.BOTTOM) {
				props.window.dimension.update({
					height: height.current + distanceY
				});
			} else if (props.alignment === Alignment.LEFT) {
				props.window.dimension.update({
					left: left.current + distanceX,
					width: width.current + -1 * distanceX
				});
			} else {
				props.window.dimension.update({
					width: width.current + distanceX
				});
			}
		},
		endMove: () => {
			props.toggleAnimation(true);
		}
	});
	return (
		<S.Container
			ref={ref}
			debug={props.debug}
			alignment={props.alignment}
			vertical={props.alignment === Alignment.LEFT || props.alignment === Alignment.RIGHT}
		></S.Container>
	);
};

namespace S {
	const INSETS = 2;

	export const Container = styled.div<{ vertical: boolean; alignment: Alignment; debug: boolean }>`
		pointer-events: all;
		cursor: ${(p) => (p.vertical ? 'col-resize' : 'row-resize')};
		position: absolute;
		${(p) => (p.vertical ? `height: 100%; width: ${INSETS * 3}px` : `width: 100%; height: ${INSETS * 3}px`)};
		${(p) => p.alignment}: -${INSETS}px;
		user-select: none;
		background: ${(p) => (p.debug ? 'cyan' : 'transparent')};
	`;
}
