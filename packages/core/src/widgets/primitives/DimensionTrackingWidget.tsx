import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useForceUpdate } from '../hooks/useForceUpdate';
import { DimensionContainer, IDimension } from '../../core/dimensions/DimensionContainer';

export interface DimensionTrackingWidgetProps {
	dimension: DimensionContainer;
	className?: any;
	animateDuration?: number;
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
		<S.Container className={props.className} d={props.dimension.dimensions} animate={props.animateDuration || 0}>
			{props.children}
		</S.Container>
	);
};

namespace S {
	export const Container = styled.div<{ d: IDimension; animate: number }>`
		position: absolute;
		width: ${(p) => p.d.width}px;
		height: ${(p) => p.d.height}px;
		top: ${(p) => p.d.top}px;
		left: ${(p) => p.d.left}px;
		${(p) => (p.animate > 0 ? 'transition: top 0.3s, left 0.3s' : '')};
	`;
}
