import * as React from 'react';
import styled from '@emotion/styled';
import { DimensionContainer, DimensionTrackingWidget } from '@projectstorm/react-workspaces-core';
import { ResizeDivision } from '@projectstorm/react-workspaces-core';

export interface ResizeDividerWidgetProps {
	dividerContainer: ResizeDivision;
}

export const ResizeDividerWidget: React.FC<ResizeDividerWidgetProps> = (props) => {
	const container = props.dividerContainer.dimensions;
	const vertical = container.dimensions.height > container.dimensions.width;

	return (
		<S.DimensionTracker dimension={container}>
			<S.Container vertical={vertical}></S.Container>
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
	`;
}
