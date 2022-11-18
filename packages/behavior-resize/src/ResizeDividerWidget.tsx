import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	Alignment,
	DimensionTrackingWidget,
	ResizeDivision,
	useMouseDragDistance,
	UseMouseDragDistanceProps,
	WorkspaceEngine
} from '@projectstorm/react-workspaces-core';

export interface ResizeDividerWidgetProps {
	dividerContainer: ResizeDivision;
	engine: WorkspaceEngine;
}

const isAligned = (divider: ResizeDivision, aligned: Alignment) => {
	if (divider.before.expandHorizontal !== divider.after.expandHorizontal) {
		return false;
	}
	let before = divider.before;
	do {
		before = before.getSibling(aligned);
		if (!before) {
			return true;
		}
		if (aligned === Alignment.LEFT && before.expandHorizontal) {
			return false;
		}
		if (aligned === Alignment.TOP && before.expandVertical) {
			return false;
		}
	} while (before);
	return false;
};

const getResizeStrategy = (divider: ResizeDivision): Pick<UseMouseDragDistanceProps, 'startMove' | 'moved'> => {
	let initial1 = 0;
	let initial2 = 0;

	const { before, after } = divider;

	if (divider.vertical) {
		// shrink|expand OR left aligned
		if ((!before.expandHorizontal && after.expandHorizontal) || isAligned(divider, Alignment.LEFT)) {
			return {
				startMove: () => {
					initial1 = before.size.width;
				},
				moved: ({ distanceX }) => {
					before.setWidth(initial1 + distanceX);
				}
			};
		}
		// expand|shrink OR right aligned
		else if ((!after.expandHorizontal && before.expandHorizontal) || !isAligned(divider, Alignment.LEFT)) {
			return {
				startMove: () => {
					initial1 = after.size.width;
				},
				moved: ({ distanceX }) => {
					after.setWidth(initial1 - distanceX);
				}
			};
		}
		// shrink|shrink
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

	// !------ VERTICAL ------
	// shrink|expand OR top aligned
	if ((!before.expandHorizontal && after.expandHorizontal) || isAligned(divider, Alignment.TOP)) {
		return {
			startMove: () => {
				initial1 = before.size.height;
			},
			moved: ({ distanceY }) => {
				before.setHeight(initial1 + distanceY);
			}
		};
	}
	// shrink|expand OR bottom aligned
	else if ((!after.expandHorizontal && before.expandHorizontal) || !isAligned(divider, Alignment.TOP)) {
		return {
			startMove: () => {
				initial1 = after.size.height;
			},
			moved: ({ distanceY }) => {
				after.setHeight(initial1 - distanceY);
			}
		};
	}

	// shrink|shrink
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
