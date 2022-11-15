import * as React from 'react';
import { useRef } from 'react';
import styled from '@emotion/styled';
import { Corner, useMouseDragDistance } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';

export interface FloatingWindowResizeCornerWidgetProps {
	corner: Corner;
	window: FloatingWindowModel;
	debug?: boolean;
}

export const FloatingWindowResizeCornerWidget: React.FC<FloatingWindowResizeCornerWidgetProps> = (props) => {
	const ref = useRef();
	// horizontal
	const val1 = useRef<number>(0);
	// vertical
	const val2 = useRef<number>(0);
	// width
	const width = useRef<number>(0);
	// height
	const height = useRef<number>(0);
	useMouseDragDistance({
		forwardRef: ref,
		startMove: () => {
			width.current = props.window.size.width;
			height.current = props.window.size.height;
			if (props.corner === Corner.TOP_LEFT) {
				val1.current = props.window.position.left;
				val2.current = props.window.position.top;
			} else if (props.corner === Corner.BOTTOM_LEFT) {
				val1.current = props.window.position.left;
			} else if (props.corner === Corner.TOP_RIGHT) {
				val2.current = props.window.position.top;
			}
		},
		moved: ({ distanceX, distanceY }) => {
			if (props.corner === Corner.TOP_LEFT) {
				props.window.dimension.update({
					left: val1.current + distanceX,
					top: val2.current + distanceY,
					width: width.current + -1 * distanceX,
					height: height.current + -1 * distanceY
				});
			} else if (props.corner === Corner.BOTTOM_LEFT) {
				props.window.dimension.update({
					left: val1.current + distanceX,
					width: width.current + -1 * distanceX,
					height: height.current + distanceY
				});
			} else if (props.corner === Corner.BOTTOM_RIGHT) {
				props.window.dimension.update({
					width: width.current + distanceX,
					height: height.current + distanceY
				});
			} else {
				props.window.dimension.update({
					top: val2.current + distanceY,
					width: width.current + distanceX,
					height: height.current + -1 * distanceY
				});
			}
		}
	});
	return <S.CornerResize debug={props.debug} ref={ref} corner={props.corner}></S.CornerResize>;
};

namespace S {
	const CORNER = 15;

	const CORNER_CSS = {
		[Corner.TOP_LEFT]: ['top', 'left'],
		[Corner.TOP_RIGHT]: ['top', 'right'],
		[Corner.BOTTOM_RIGHT]: ['bottom', 'right'],
		[Corner.BOTTOM_LEFT]: ['bottom', 'left']
	};

	export const CornerResize = styled.div<{ corner: Corner; debug: boolean }>`
		pointer-events: all;
		cursor: ${(p) => p.corner}-resize;
		position: absolute;
		width: ${CORNER}px;
		height: ${CORNER}px;
		${(p) => CORNER_CSS[p.corner].map((c) => `${c}:-${CORNER / 2}px`).join(';')};
		user-select: none;
		background: ${(p) => (p.debug ? 'red' : 'transparent')};
	`;
}
