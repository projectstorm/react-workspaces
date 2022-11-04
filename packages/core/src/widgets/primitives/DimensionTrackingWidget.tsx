import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useForceUpdate } from '../hooks/useForceUpdate';
import { Dimension, DimensionContainer } from '../../core/DimensionContainer';

export interface DimensionTrackingWidgetProps {
	dimension: DimensionContainer;
	className?: any;
}

export const DimensionTrackingWidget: React.FC<React.PropsWithChildren<DimensionTrackingWidgetProps>> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.dimension.registerListener({
			updated: () => {
				forceUpdate();
			}
		});
	}, [props.dimension]);
	return (
		<S.Container className={props.className} d={props.dimension.dimensions}>
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
