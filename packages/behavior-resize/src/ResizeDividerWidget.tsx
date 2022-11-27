import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	Alignment,
	DimensionTrackingWidget,
	getAlignmentInverted,
	ResizeDivision,
	useMouseDragDistance,
	UseMouseDragDistanceProps,
	WorkspaceEngine,
	WorkspaceModel,
	WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';

export interface ResizeDividerWidgetProps {
	dividerContainer: ResizeDivision;
	engine: WorkspaceEngine;
	parent: WorkspaceNodeModel;
}

const isAligned = (divider: ResizeDivision, aligned: Alignment, parent: WorkspaceNodeModel) => {
	let beforeDirective = parent.getPanelDirective(divider.before);
	const afterDirective = parent.getPanelDirective(divider.after);
	if (beforeDirective.expand !== afterDirective.expand) {
		return false;
	}
	let before = divider.before;
	do {
		before = before.getSibling(aligned);
		if (!before) {
			return true;
		}
		let beforeDirective = parent.getPanelDirective(before);
		if (beforeDirective.expand) {
			return false;
		}
	} while (before);
	return false;
};

const getAvailableElement = (model: WorkspaceModel, aligned: Alignment) => {
	let width = [Alignment.LEFT, Alignment.RIGHT].indexOf(aligned) !== -1;
	const sibling = model.getSibling(aligned);
	if (!sibling) {
		return model;
	}
	if (
		width &&
		[model.size.width, model.minimumSize.width, model.maximumSize.width].every((v, index, arr) => v === arr[0])
	) {
		return getAvailableElement(sibling, aligned);
	}
	if (
		!width &&
		[model.size.height, model.minimumSize.height, model.maximumSize.height].every((v, index, arr) => v === arr[0])
	) {
		return getAvailableElement(sibling, aligned);
	}
	return model;
};

const getResizeStrategy = (
	divider: ResizeDivision,
	parent: WorkspaceNodeModel
): Pick<UseMouseDragDistanceProps, 'startMove' | 'moved'> => {
	let sizeSnapshot = new Map<WorkspaceModel, number>();

	const isExpand = (model: WorkspaceModel) => {
		return parent.getPanelDirective(model).expand;
	};

	const setSize = (model: WorkspaceModel, val: number) => {
		if (divider.vertical) {
			model.setWidth(val);
		} else {
			model.setHeight(val);
		}
	};

	return {
		startMove: () => {
			sizeSnapshot = new Map(
				parent.children.map((c) => {
					if (parent.vertical) {
						return [c, c.size.height];
					}
					return [c, c.size.width];
				})
			);
		},
		moved: ({ distanceX, distanceY }) => {
			const distance = divider.vertical ? distanceX : distanceY;
			const alignment = divider.vertical ? Alignment.LEFT : Alignment.TOP;

			let { before, after } = divider;

			// shrink|expand OR left aligned
			if ((!isExpand(before) && isExpand(after)) || isAligned(divider, alignment, parent)) {
				before = getAvailableElement(before, alignment);
				setSize(before, sizeSnapshot.get(before) + distance);
			}
			// expand|shrink OR right aligned
			if ((isExpand(before) && !isExpand(after)) || !isAligned(divider, alignment, parent)) {
				after = getAvailableElement(after, getAlignmentInverted(alignment));
				setSize(after, sizeSnapshot.get(after) - distance);
			}
			// shrink|shrink
			else {
				setSize(before, sizeSnapshot.get(before) + distance);
			}
		}
	};
};

export const ResizeDividerWidget: React.FC<ResizeDividerWidgetProps> = (props) => {
	const container = props.dividerContainer.dimensions;
	const vertical = props.dividerContainer.vertical;
	const ref = useRef<HTMLDivElement>();
	const [strategy] = useState(() => {
		return getResizeStrategy(props.dividerContainer, props.parent);
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
