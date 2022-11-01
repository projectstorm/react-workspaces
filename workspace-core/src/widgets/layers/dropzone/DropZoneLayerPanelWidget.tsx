import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { Dimension } from '../../../core/DimensionContainer';
import { DimensionTrackingWidget } from '../../primitives/DimensionTrackingWidget';
import { css } from '@emotion/react';

export interface DropZoneLayerPanelWidgetProps {
	model: WorkspaceModel;
}

export const DropZoneLayerPanelWidget: React.FC<DropZoneLayerPanelWidgetProps> = (props) => {
	const [mouseEntered, setMouseEntered] = useState(false);
	return (
		<S.DimensionTracking entered={mouseEntered} model={props.model}>
			<S.Inside
				onMouseEnter={() => {
					setMouseEntered(true);
				}}
				onMouseLeave={() => {
					setMouseEntered(false);
				}}
			>
				<S.SplitContainerLeft />
				<S.SplitContainerRight />
				<S.SplitContainerTop />
				<S.SplitContainerBottom />
				{/*<SplitPanelWidget rotate={90} />*/}
				{/*<SplitPanelWidget rotate={180} />*/}
				{/*<SplitPanelWidget rotate={270} />*/}
			</S.Inside>
		</S.DimensionTracking>
	);
};

namespace S {
	export const DimensionTracking = styled(DimensionTrackingWidget)<{ entered: boolean }>`
		border: solid 2px #0096ff;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.4);
		opacity: ${(p) => (p.entered ? 1 : 0.4)};

		&:hover {
			border: solid 2px orange;
		}
	`;

	export const Inside = styled.div`
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	const SPLIT_THICK = 11;
	const SPLIT_LENGTH = 60;
	const SPLIT_MARGIN = 5;

	const SplitContainerShared = css`
		border-radius: 2px;
		background: #0096ff;
		position: absolute;

		&:hover {
			background: orange;
		}
	`;

	export const SplitContainerLeft = styled.div`
		${SplitContainerShared};
		width: ${SPLIT_THICK}px;
		height: ${SPLIT_LENGTH}px;
		left: ${SPLIT_MARGIN}px;
	`;

	export const SplitContainerRight = styled.div`
		${SplitContainerShared};
		width: ${SPLIT_THICK}px;
		height: ${SPLIT_LENGTH}px;
		right: ${SPLIT_MARGIN}px;
	`;

	export const SplitContainerTop = styled.div`
		${SplitContainerShared};
		height: ${SPLIT_THICK}px;
		width: ${SPLIT_LENGTH}px;
		top: ${SPLIT_MARGIN}px;
	`;

	export const SplitContainerBottom = styled.div`
		${SplitContainerShared};
		height: ${SPLIT_THICK}px;
		width: ${SPLIT_LENGTH}px;
		bottom: ${SPLIT_MARGIN}px;
	`;
}
