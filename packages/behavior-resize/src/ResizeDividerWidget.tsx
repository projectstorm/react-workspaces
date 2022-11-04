import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	DimensionTrackingWidget,
	ResizeDivision,
	useMouseDragDistance,
	WorkspaceEngine
} from '@projectstorm/react-workspaces-core';
import { UseMouseDragDistanceProps } from '@projectstorm/react-workspaces-core';
import { Alignment } from '@projectstorm/react-workspaces-core';

export interface ResizeDividerWidgetProps {
	dividerContainer: ResizeDivision;
	engine: WorkspaceEngine;
}

const getResizeStrategy = (divider: ResizeDivision): Pick<UseMouseDragDistanceProps, 'startMove' | 'moved'> => {
	let initial = 0;
	let initial2 = 0;
	const { before, after, dimensions } = divider;

	if (dimensions.isPortrait()) {
		// before shrinks + HACK
		if ((!before.expandHorizontal && after.expandHorizontal) || !before.getSibling(Alignment.LEFT)) {
			return {
				startMove: () => {
					initial = before.width;
				},
				moved: ({ distanceX }) => {
					before.setWidth(initial + distanceX);
				}
			};
		}
		// after shrinks + HACK
		else if ((!after.expandHorizontal && before.expandHorizontal) || !after.getSibling(Alignment.RIGHT)) {
			return {
				startMove: () => {
					initial = after.width;
				},
				moved: ({ distanceX }) => {
					after.setWidth(initial - distanceX);
				}
			};
		}
		// both shrink
		else if (!before.expandHorizontal && !after.expandHorizontal) {
			return {
				startMove: () => {
					initial = before.width;
					initial2 = after.width;
				},
				moved: ({ distanceX }) => {
					before.setWidth(initial + distanceX);
					after.setWidth(initial2 - distanceX);
				}
			};
		}
	}
	if (!before.expandVertical) {
		return {
			startMove: () => {
				initial = before.height;
			},
			moved: ({ distanceY }) => {
				before.setHeight(initial + distanceY);
			}
		};
	} else if (!after.expandHorizontal) {
		return {
			startMove: () => {
				initial = after.height;
			},
			moved: ({ distanceY }) => {
				after.setHeight(initial - distanceY);
			}
		};
	}
};

export const ResizeDividerWidget: React.FC<ResizeDividerWidgetProps> = (props) => {
	const container = props.dividerContainer.dimensions;
	const vertical = container.isPortrait();
	const ref = useRef<HTMLDivElement>();
	const [strategy] = useState(() => {
		return getResizeStrategy(props.dividerContainer);
	});

	useEffect(() => {
		return props.engine.registerListener({
			layoutInvalidated: () => {
				props.dividerContainer.dimensions.invalidate();
			}
		});
	}, []);
	useMouseDragDistance({
		forwardRef: ref,
		...strategy
	});

	return (
		<S.DimensionTracker dimension={container}>
			<S.Container ref={ref} vertical={vertical}></S.Container>
		</S.DimensionTracker>
	);
};
namespace S {
	export const DimensionTracker = styled(DimensionTrackingWidget)``;
	const INSETS = 2;

	export const Container = styled.div<{ vertical: boolean }>`
		pointer-events: all;
		cursor: ${(p) => (p.vertical ? 'col-resize' : 'row-resize')};
		position: absolute;
		top: -${INSETS}px;
		left: -${INSETS}px;
		bottom: -${INSETS}px;
		right: -${INSETS}px;
		user-select: none;
	`;
}
