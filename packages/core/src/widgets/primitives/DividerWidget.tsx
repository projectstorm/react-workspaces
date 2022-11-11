import * as React from 'react';
import { useRef } from 'react';
import styled from '@emotion/styled';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { DimensionContainer } from '../../core/dimensions/DimensionContainer';

export interface DividerWidgetProps {
	dimensionContainer: DimensionContainer;
}

export const DividerWidget: React.FC<DividerWidgetProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	useResizeObserver({
		forwardRef: ref,
		dimension: props.dimensionContainer
	});
	return <S.Container ref={ref}></S.Container>;
};
namespace S {
	export const Container = styled.div`
		min-width: 4px;
		min-height: 4px;
	`;
}
