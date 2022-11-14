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
	let initial1 = 0;
	let initial2 = 0;

	const { before, after } = divider;

	if (divider.vertical) {
		// before shrinks + HACK
		if ((!before.expandHorizontal && after.expandHorizontal) || !before.getSibling(Alignment.LEFT)) {
			return {
				startMove: () => {
					initial1 = before.size.width;
				},
				moved: ({ distanceX }) => {
					before.setWidth(initial1 + distanceX);
				}
			};
		}
		// after shrinks + HACK
		else if ((!after.expandHorizontal && before.expandHorizontal) || !after.getSibling(Alignment.RIGHT)) {
			return {
				startMove: () => {
					initial1 = after.size.width;
				},
				moved: ({ distanceX }) => {
					after.setWidth(initial1 - distanceX);
				}
			};
		}
		// both shrink
		else if (!before.expandHorizontal && !after.expandHorizontal) {
			return {
				startMove: () => {
					initial1 = before.size.width;
					initial2 = after.size.width;
				},
				moved: ({ distanceX }) => {
					before.setWidth(initial1 + distanceX);
					after.setWidth(initial2 - distanceX);
				}
			};
		}
	}
	if (!before.expandVertical) {
		return {
			startMove: () => {
				initial1 = before.size.height;
			},
			moved: ({ distanceY }) => {
				before.setHeight(initial1 + distanceY);
			}
		};
	} else if (!after.expandHorizontal) {
		return {
			startMove: () => {
				initial1 = after.size.height;
			},
			moved: ({ distanceY }) => {
				after.setHeight(initial1 - distanceY);
			}
		};
	}
	return {
		startMove: () => {
			initial1 = before.size.height;
			initial2 = after.size.height;
		},
		moved: ({ distanceY }) => {
			before.setHeight(initial1 + distanceY);
			after.setHeight(initial2 - distanceY);
		}
	};
};

export const ResizeDividerWidget: React.FC<ResizeDividerWidgetProps> = (props) => {
	const container = props.dividerContainer.dimensions;
	const vertical = props.dividerContainer.vertical;
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
