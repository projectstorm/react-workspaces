import { DimensionContainer } from '../../core/dimensions/DimensionContainer';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { useEffect } from 'react';

export interface UseDimensionLayoutInvalidatorOptions {
  dimension: DimensionContainer;
  engine: WorkspaceEngine;
}

export const useDimensionLayoutInvalidator = (props: UseDimensionLayoutInvalidatorOptions) => {
  useEffect(() => {
    let l2 = null;
    const l1 = props.engine.registerListener({
      layoutInvalidated: () => {
        // wait for a repaint
        l2 = props.engine.registerListener({
          layoutRepainted: () => {
            l2?.();
            l2 = null;
            props.dimension.invalidate();
          }
        });
      }
    });

    return () => {
      l1();
      l2?.();
    };
  }, [props.dimension]);
};
