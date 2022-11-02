import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';
import { css } from '@emotion/react';
import { DropZoneLayerButtonWidget } from './DropZoneLayerButtonWidget';
import { DimensionTrackingWidget, WorkspaceModel } from '@projectstorm/react-workspaces-core';

export const DropZoneDragContext = React.createContext<{
	increment: () => any;
	decrement: () => any;
}>(null);

export interface DropZoneLayerPanelWidgetProps {
	model: WorkspaceModel;
}

export const DropZoneLayerPanelWidget: React.FC<DropZoneLayerPanelWidgetProps> = (props) => {
	const dragCount = useRef(0);
	const [show, setShow] = useState(false);

	console.log(dragCount);
	return (
		<DropZoneDragContext.Provider
			value={{
				increment: () => {
					dragCount.current = dragCount.current + 1;
					if (!show && dragCount.current > 0) {
						setShow(true);
					}
				},
				decrement: () => {
					dragCount.current = dragCount.current - 1;
					if (show && dragCount.current === 0) {
						setShow(false);
					}
				}
			}}
		>
			<DropZoneDragContext.Consumer>
				{({ increment, decrement }) => (
					<S.DimensionTracking entered={show} model={props.model}>
						<S.Inside
							onDragEnter={() => {
								increment();
							}}
							onDragLeave={() => {
								decrement();
							}}
						>
							<S.Layer visible={show}>
								<S.SplitContainerLeft />
								<S.SplitContainerRight />
								<S.SplitContainerTop />
								<S.SplitContainerBottom />
							</S.Layer>
							<S.Layer2 visible={show}>
								<S.ButtonBar>
									<DropZoneLayerButtonWidget text="Replace" icon="copy" />
									{/*<DropZoneLayerButtonWidget text="Tabs" icon="" />*/}
								</S.ButtonBar>
							</S.Layer2>
						</S.Inside>
					</S.DimensionTracking>
				)}
			</DropZoneDragContext.Consumer>
		</DropZoneDragContext.Provider>
	);
};

namespace S {
	export const DimensionTracking = styled(DimensionTrackingWidget)<{ entered: boolean }>`
		border: solid 2px transparent;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.4);
		opacity: ${(p) => (p.entered ? 1 : 0.4)};
		transition: border 0.5s, opacity 0.5s;
		pointer-events: all;

		&:hover {
			border: solid 2px #0096ff;
		}
	`;

	export const ButtonBar = styled.div`
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	`;

	export const Layer = styled.div<{ visible: boolean }>`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		opacity: ${(p) => (p.visible ? 1 : 0)};
	`;

	export const Layer2 = styled.div<{ visible: boolean }>`
		position: absolute;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		padding: 20px;
		pointer-events: none;
		opacity: ${(p) => (p.visible ? 1 : 0)};
	`;

	export const Inside = styled.div`
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	const SPLIT_THICK = 13;
	const SPLIT_LENGTH = 60;
	const SPLIT_MARGIN = 8;

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
