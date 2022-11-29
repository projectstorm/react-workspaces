import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as React from 'react';
import { useResizeObserver } from './useResizeObserver';
import { useEffect } from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { useDimensionLayoutInvalidator } from './useDimensionLayoutInvalidator';

export interface UseModelElementProps {
  model: WorkspaceModel;
  engine: WorkspaceEngine;
}

export const useModelElement = (props: UseModelElementProps) => {
  const ref = React.useRef<HTMLDivElement>();
  useDimensionLayoutInvalidator({
    engine: props.engine,
    dimension: props.model.r_dimensions
  });
  useResizeObserver({
    forwardRef: ref,
    dimension: props.model.r_dimensions,
    engine: props.engine
  });
  useEffect(() => {
    props.model.setVisible(true);
    return () => {
      props.model.setVisible(false);
    };
  }, []);
  return ref;
};
