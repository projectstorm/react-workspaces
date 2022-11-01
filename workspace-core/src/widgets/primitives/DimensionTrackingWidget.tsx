import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { useForceUpdate } from '../hooks/useForceUpdate';
import { Dimension } from '../../core/DimensionContainer';

export interface DimensionTrackingWidgetProps {
	model: WorkspaceModel;
	className?: any;
}

export const DimensionTrackingWidget: React.FC<React.PropsWithChildren<DimensionTrackingWidgetProps>> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.model.r_dimensions.registerListener({
			updated: () => {
				forceUpdate();
			}
		});
	}, [props.model]);
	return (
		<S.Container className={props.className} d={props.model.r_dimensions.dimensions}>
			{props.children}
		</S.Container>
	);
};

namespace S {
	export const Container = styled.div<{ d: Dimension }>`
		position: absolute;
		width: ${(p) => p.d.width}px;
		height: ${(p) => p.d.height}px;
		top: ${(p) => p.d.top}px;
		left: ${(p) => p.d.left}px;
	`;
}
