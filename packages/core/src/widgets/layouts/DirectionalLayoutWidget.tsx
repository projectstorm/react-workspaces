import * as React from 'react';
import { useCallback } from 'react';
import * as _ from 'lodash';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import styled from '@emotion/styled';
import { DimensionContainer } from '../../core/dimensions/DimensionContainer';
import { DividerWidget } from '../../widgets/primitives/DividerWidget';
import { DirectionChildWidget, DirectionLayoutChildDirective } from './DirectionalChildWidget';

export interface DirectionalLayoutWidgetProps {
  vertical: boolean;
  engine: WorkspaceEngine;
  data: WorkspaceModel[];
  getChildSizeDirective: (model: WorkspaceModel) => DirectionLayoutChildDirective;
  generateElement: (model: WorkspaceModel) => JSX.Element;
  generateDivider?: (divider: DimensionContainer) => JSX.Element;
  dimensionContainerForDivider: (index: number) => DimensionContainer;
  forwardRef: React.RefObject<HTMLDivElement>;
  className?: any;
}

namespace S {
  export const Container = styled.div<{ vertical: boolean }>`
    display: flex;
    flex-grow: 1;
    flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
    max-height: 100%;
  `;
}

export const DirectionalLayoutWidget: React.FC<DirectionalLayoutWidgetProps> = (props) => {
  const firstDivider = props.dimensionContainerForDivider(0);
  const generateDivider = useCallback((dimension: DimensionContainer) => {
    if (props.generateDivider) {
      return props.generateDivider(dimension);
    }
    return <DividerWidget engine={props.engine} dimensionContainer={dimension} />;
  }, []);
  return (
    <S.Container ref={props.forwardRef} className={props.className} vertical={props.vertical}>
      <React.Fragment key={firstDivider.id}>{generateDivider(firstDivider)}</React.Fragment>
      {_.map(props.data, (model: WorkspaceModel, index) => {
        const dimension = props.dimensionContainerForDivider(index + 1);
        return (
          <React.Fragment key={model.id}>
            <DirectionChildWidget {...props} directive={props.getChildSizeDirective(model)} model={model} />
            <React.Fragment key={dimension.id}>{generateDivider(dimension)}</React.Fragment>
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};
