import * as React from 'react';
import { useRef } from 'react';
import styled from '@emotion/styled';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { DimensionContainer } from '../../core/dimensions/DimensionContainer';
import { useDimensionLayoutInvalidator } from '../hooks/useDimensionLayoutInvalidator';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface DividerWidgetProps {
  dimensionContainer: DimensionContainer;
  engine: WorkspaceEngine;
  thickness?: number;
}

export const DividerWidget: React.FC<DividerWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>();
  useDimensionLayoutInvalidator({
    engine: props.engine,
    dimension: props.dimensionContainer
  });
  useResizeObserver({
    forwardRef: ref,
    dimension: props.dimensionContainer,
    engine: props.engine
  });
  return <S.Container thickness={props.thickness ?? 4} ref={ref}></S.Container>;
};
namespace S {
  export const Container = styled.div<{ thickness: number }>`
    min-width: 4px;
    min-height: 4px;
  `;
}
