import * as React from 'react';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { ResizeDimensionContainer } from '../../entities/node/ResizeDimensionContainer';
import { useForceUpdate } from '../hooks/useForceUpdate';

export interface DividerWidgetProps {
  dimensionContainer: ResizeDimensionContainer;
  engine: WorkspaceEngine;
  thickness?: number;
  hoverColor: string;
  activeColor: string;
}

export const DividerWidget: React.FC<DividerWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    return props.dimensionContainer.registerListener({
      activeChanged: () => {
        forceUpdate();
      },
      hoverChanged: () => {
        forceUpdate();
      }
    });
  }, []);

  useResizeObserver({
    forwardRef: ref,
    dimension: props.dimensionContainer,
    engine: props.engine
  });
  return (
    <S.Container
      hoverColor={props.hoverColor}
      activeColor={props.activeColor}
      hover={props.dimensionContainer.hover}
      active={props.dimensionContainer.active}
      thickness={props.thickness ?? 4}
      ref={ref}
    ></S.Container>
  );
};
namespace S {
  export const Container = styled.div<{
    thickness: number;
    hover: boolean;
    active: boolean;
    hoverColor: string;
    activeColor: string;
  }>`
    min-width: 4px;
    min-height: 4px;
    transition: background 0.2s;
    transition-delay: 50ms;
    ${(p) => (p.hover ? `background: ${p.hoverColor}` : '')};
    ${(p) => (p.active ? `background: ${p.activeColor}` : '')};
  `;
}
