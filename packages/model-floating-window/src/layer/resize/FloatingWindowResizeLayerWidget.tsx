import * as React from 'react';
import styled from '@emotion/styled';
import { Alignment, Corner, DimensionTrackingWidget, useMouseDragDistance } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { useRef } from 'react';

export interface FloatingWindowResizeLayerWidgetProps {
	window: FloatingWindowModel;
}

export const FloatingWindowResizeLayerWidget: React.FC<FloatingWindowResizeLayerWidgetProps> = (props) => {
	return (
		<DimensionTrackingWidget dimension={props.window.dimension}>
			<S.Relative>
				<FloatingWindowResizeDivider alignment={Alignment.LEFT} />
				<FloatingWindowResizeDivider alignment={Alignment.TOP} />
				<FloatingWindowResizeDivider alignment={Alignment.BOTTOM} />
				<FloatingWindowResizeDivider alignment={Alignment.RIGHT} />
				<FloatingWindowResizeCorner window={props.window} corner={Corner.TOP_LEFT} />
				<FloatingWindowResizeCorner window={props.window} corner={Corner.TOP_RIGHT} />
				<FloatingWindowResizeCorner window={props.window} corner={Corner.BOTTOM_RIGHT} />
				<FloatingWindowResizeCorner window={props.window} corner={Corner.BOTTOM_LEFT} />
			</S.Relative>
		</DimensionTrackingWidget>
	);
};

export interface FloatingWindowResizeDividerProps {
	alignment: Alignment;
}

export const FloatingWindowResizeDivider: React.FC<FloatingWindowResizeDividerProps> = (props) => {
	return (
		<S.Container
			alignment={props.alignment}
			vertical={props.alignment === Alignment.LEFT || props.alignment === Alignment.RIGHT}
		></S.Container>
	);
};

export interface FloatingWindowResizeCornerProps {
	corner: Corner;
	window: FloatingWindowModel;
}

export const FloatingWindowResizeCorner: React.FC<FloatingWindowResizeCornerProps> = (props) => {
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
	return <S.CornerResize ref={ref} corner={props.corner}></S.CornerResize>;
};

namespace S {
	const INSETS = 2;
	const CORNER = 15;

	export const Relative = styled.div`
		position: relative;
		height: 100%;
		width: 100%;
	`;

	export const Container = styled.div<{ vertical: boolean; alignment: Alignment }>`
		pointer-events: all;
		cursor: ${(p) => (p.vertical ? 'col-resize' : 'row-resize')};
		position: absolute;
		${(p) => (p.vertical ? `height: 100%; width: ${INSETS * 3}px` : `width: 100%; height: ${INSETS * 3}px`)};
		${(p) => p.alignment}: ${INSETS}px;
		user-select: none;
		//background: cyan;
	`;

	const CORNER_CSS = {
		[Corner.TOP_LEFT]: ['top', 'left'],
		[Corner.TOP_RIGHT]: ['top', 'right'],
		[Corner.BOTTOM_RIGHT]: ['bottom', 'right'],
		[Corner.BOTTOM_LEFT]: ['bottom', 'left']
	};

	export const CornerResize = styled.div<{ corner: Corner }>`
		pointer-events: all;
		cursor: ${(p) => p.corner}-resize;
		position: absolute;
		width: ${CORNER}px;
		height: ${CORNER}px;
		${(p) => CORNER_CSS[p.corner].map((c) => `${c}:-${CORNER / 2}px`).join(';')};
		user-select: none;
		//background: red;
	`;
}
