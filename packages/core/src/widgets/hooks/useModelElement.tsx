import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as React from 'react';
import { useEffect } from 'react';
import { useResizeObserver } from './useResizeObserver';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface UseModelElementProps {
  model: WorkspaceModel;
  engine: WorkspaceEngine;
}

export const useModelElement = (props: UseModelElementProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
  }, [props.model]);
  return ref;
};
