import * as React from 'react';
import styled from '@emotion/styled';
import { useDroppableModel, useMouseDragEvents, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { useRef, useState } from 'react';
import { TransformZone } from './DropZoneLayerPanelWidget';
import { WorkspaceModel } from '@projectstorm/react-workspaces-core';

export interface DropZoneTransformWidgetProps {
	engine: WorkspaceEngine;
	zone: TransformZone;
	model: WorkspaceModel;
}

export const DropZoneTransformWidget: React.FC<DropZoneTransformWidgetProps> = (props) => {
	const [entered, setEntered] = useState(false);
	const ref = useRef<HTMLDivElement>();
	useMouseDragEvents({
		forwardRef: ref,
		mouseEnter: () => {
			setEntered(true);
		},
		mouseExit: () => {
			setEntered(false);
		}
	});
	useDroppableModel({
		forwardRef: ref,
		engine: props.engine,
		onDrop: (model) => {
			props.zone.transform({
				model,
				zoneModel: props.model,
				engine: props.engine
			});
		}
	});
	return <S.Container ref={ref}>{props.zone.render({ entered })}</S.Container>;
};
namespace S {
	export const Container = styled.div``;
}
