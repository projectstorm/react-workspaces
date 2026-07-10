import * as React from 'react';
import { useCallback, useRef } from 'react';
import * as _ from 'lodash';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import styled from '@emotion/styled';
import { DividerWidget } from '../../widgets/primitives/DividerWidget';
import { DirectionChildWidget } from './DirectionalChildWidget';
import { ResizeDimensionContainer } from '../../entities/node/ResizeDimensionContainer';
import { useResizeObserver } from '../hooks/useResizeObserver';

export interface DirectionalLayoutWidgetProps {
  vertical: boolean;
  engine: WorkspaceEngine;
  data: WorkspaceModel[];
  shouldModelExpand: (model: WorkspaceModel) => boolean;
  generateElement: (model: WorkspaceModel) => React.JSX.Element;
  generateDivider: (divider: ResizeDimensionContainer) => React.JSX.Element;
  dimensionContainerForDivider: (index: number) => ResizeDimensionContainer;
  forwardRef: React.RefObject<HTMLDivElement>;
  className?: any;
}

namespace S {
  export const Container = styled.div<{ vertical: boolean }>`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
    min-height: 0;
    min-width: 0;
    max-height: 100%;
  `;

  export const BoundaryDivider = styled.div<{ vertical: boolean; end: boolean }>`
    position: absolute;
    ${(p) =>
      p.vertical
        ? `
          left: 0;
          right: 0;
          ${p.end ? 'bottom' : 'top'}: 0;
          height: 0;
          min-height: 0;
        `
        : `
          top: 0;
          bottom: 0;
          ${p.end ? 'right' : 'left'}: 0;
          width: 0;
          min-width: 0;
        `};
  `;
}

interface BoundaryDividerProps {
  dimension: ResizeDimensionContainer;
  engine: WorkspaceEngine;
  vertical: boolean;
  end: boolean;
}

const BoundaryDivider: React.FC<BoundaryDividerProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useResizeObserver({
    forwardRef: ref,
    dimension: props.dimension,
    engine: props.engine
  });
  return <S.BoundaryDivider ref={ref} vertical={props.vertical} end={props.end} />;
};

export const DirectionalLayoutWidget: React.FC<DirectionalLayoutWidgetProps> = (props) => {
  if (props.data.length === 0) {
    return <S.Container ref={props.forwardRef} className={props.className} vertical={props.vertical}></S.Container>;
  }
  const generateDivider = useCallback((dimension: ResizeDimensionContainer) => {
    if (props.generateDivider) {
      return props.generateDivider(dimension);
    }
    return (
      <DividerWidget
        activeColor={'transparent'}
        hoverColor={'transparent'}
        engine={props.engine}
        dimensionContainer={dimension}
      />
    );
  }, []);

  const generateBoundaryDivider = (dimension: ResizeDimensionContainer, end: boolean) => {
    return <BoundaryDivider dimension={dimension} engine={props.engine} vertical={props.vertical} end={end} />;
  };
  return (
    <S.Container ref={props.forwardRef} className={props.className} vertical={props.vertical}>
      <React.Fragment key={props.dimensionContainerForDivider(0).id}>
        {generateBoundaryDivider(props.dimensionContainerForDivider(0), false)}
      </React.Fragment>
      {_.map(props.data, (model: WorkspaceModel, index) => {
        const isLastChild = index === props.data.length - 1;
        const dimension = isLastChild ? null : props.dimensionContainerForDivider(index + 1);
        return (
          <React.Fragment key={model.id}>
            <DirectionChildWidget {...props} expand={props.shouldModelExpand(model)} model={model} />
            {dimension && <React.Fragment key={dimension.id}>{generateDivider(dimension)}</React.Fragment>}
          </React.Fragment>
        );
      })}
      <React.Fragment key={props.dimensionContainerForDivider(props.data.length).id}>
        {generateBoundaryDivider(props.dimensionContainerForDivider(props.data.length), true)}
      </React.Fragment>
    </S.Container>
  );
};
