import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { DropZoneLayerButtonWidget } from './DropZoneLayerButtonWidget';
import {
	DimensionTrackingWidget,
	UseMouseDragEventsRootWidget,
	WorkspaceModel
} from '@projectstorm/react-workspaces-core';
import { DropZoneAlignmentButtonWidget } from './DropZoneAlignmentButtonWidget';
import { Alignment } from '@projectstorm/react-workspaces-core';

export const DropZoneDragContext = React.createContext<{
	increment: () => any;
	decrement: () => any;
}>(null);

export interface DropZoneLayerPanelWidgetProps {
	model: WorkspaceModel;
}

export const DropZoneLayerPanelWidget: React.FC<DropZoneLayerPanelWidgetProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	const [show, setShow] = useState(false);

	return (
		<UseMouseDragEventsRootWidget
			forwardRef={ref}
			mouseEnter={() => {
				setShow(true);
			}}
			mouseExit={() => {
				setShow(false);
			}}
		>
			<S.DimensionTracking entered={show} model={props.model}>
				<S.Inside ref={ref}>
					<S.Layer visible={show}>
						<DropZoneAlignmentButtonWidget alignment={Alignment.TOP} />
						<DropZoneAlignmentButtonWidget alignment={Alignment.LEFT} />
						<DropZoneAlignmentButtonWidget alignment={Alignment.BOTTOM} />
						<DropZoneAlignmentButtonWidget alignment={Alignment.RIGHT} />
					</S.Layer>
					<S.Layer2 visible={show}>
						<S.ButtonBar>
							<DropZoneLayerButtonWidget text="Replace" icon="copy" />
							{/*<DropZoneLayerButtonWidget text="Tabs" icon="" />*/}
						</S.ButtonBar>
					</S.Layer2>
				</S.Inside>
			</S.DimensionTracking>
		</UseMouseDragEventsRootWidget>
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
}
