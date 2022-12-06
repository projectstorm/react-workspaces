import * as React from 'react';
import { useEffect } from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { Alignment } from '../../core/tools';
import { UseBaseBaseResizeObserverProps, useBaseResizeObserver } from './useBaseResizeObserver';
import { useDimensionLayoutInvalidator } from './useDimensionLayoutInvalidator';

export interface UseResizeObserverProps extends UseBaseBaseResizeObserverProps {
  engine: WorkspaceEngine;
}

export const useResizeObserver = (props: UseResizeObserverProps) => {
  useBaseResizeObserver({
    ...props,
    transformer: (dims) => {
      return {
        ...dims,
        [Alignment.TOP]: dims[Alignment.TOP] - props.engine.workspaceContainer.position.top,
        [Alignment.LEFT]: dims[Alignment.LEFT] - props.engine.workspaceContainer.position.left,
        [Alignment.BOTTOM]: dims[Alignment.BOTTOM] - props.engine.workspaceContainer.position.bottom,
        [Alignment.RIGHT]: dims[Alignment.RIGHT] - props.engine.workspaceContainer.position.right
      };
    }
  });

  //
  useDimensionLayoutInvalidator({
    engine: props.engine,
    dimension: props.dimension
  });

  // listen to the workspace size changing
  useEffect(() => {
    return props.engine.workspaceContainer.registerListener({
      updated: () => {
        props.dimension.invalidate();
      }
    });
  }, []);
};
