import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { DimensionContainer } from '../core/DimensionContainer';
import { useResizeObserver } from './hooks/useResizeObserver';

export interface ResizeOverlayWidgetProps {
	vertical: boolean;
	onClick?: (event: { max: number; value: number }) => any;
}

const THICKNESS = 4;

export const ResizeOverlayWidget: React.FC<ResizeOverlayWidgetProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	const [position, setPosition] = useState(0);

	const [dimension] = useState(() => {
		return new DimensionContainer();
	});

	useResizeObserver({
		dimension: dimension,
		forwardRef: ref
	});

	useEffect(() => {
		const mouseMove = (event: MouseEvent) => {
			const pos = dimension.getRelativeMousePosition(event);
			if (props.vertical) {
				setPosition(pos.clientX);
			} else {
				setPosition(pos.clientY);
			}
		};

		const click = (event: MouseEvent) => {
			props.onClick?.({
				max: props.vertical ? dimension.dimensions.width : dimension.dimensions.height,
				value: position
			});
		};

		ref.current.addEventListener('mousemove', mouseMove);
		ref.current.addEventListener('mousedown', click);
		return () => {
			ref.current?.removeEventListener('mousemove', mouseMove);
			ref.current?.removeEventListener('mousedown', click);
		};
	}, []);

	return (
		<S.Container ref={ref}>
			<S.Divider position={position - THICKNESS / 2} vertical={props.vertical} />
		</S.Container>
	);
};
namespace S {
	export const Container = styled.div`
		position: relative;
		height: 100%;
		width: 100%;
	`;

	export const Divider = styled.div<{ vertical: boolean; position: number }>`
		background: mediumpurple;
		position: absolute;
		${(p) => (p.vertical ? 'width: 4px' : 'height: 4px')};
		${(p) => (p.vertical ? 'height: 100%' : 'width: 100%')};
		${(p) => (p.vertical ? `left: ${p.position}px` : `top: ${p.position}px`)};
	`;
}
