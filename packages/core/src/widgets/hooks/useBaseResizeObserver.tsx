import * as React from 'react';
import { useCallback, useEffect } from 'react';
import * as _ from 'lodash';
import { useWindowResize } from './useWindowResize';
import { DimensionContainer, IDimension } from '../../core/dimensions/DimensionContainer';
import { Alignment } from '../../core/tools';

export interface UseBaseBaseResizeObserverProps {
  dimension: DimensionContainer;
  forwardRef: React.RefObject<HTMLDivElement>;
  ignoreDebounce?: boolean;
  transformer?: (dims: IDimension) => IDimension;
}

export const useBaseResizeObserver = (props: UseBaseBaseResizeObserverProps) => {
  const updateLogic = useCallback(() => {
    if (!props.forwardRef.current) {
      return;
    }
    let dims = props.forwardRef.current.getBoundingClientRect();

    const dimObject = {
      width: dims.width,
      height: dims.height,

      // we offset sizes here based on the root workspace
      [Alignment.TOP]: dims.top,
      [Alignment.LEFT]: dims.left,
      [Alignment.BOTTOM]: dims.bottom,
      [Alignment.RIGHT]: dims.right
    };

    props.dimension.update(props.transformer?.(dimObject) || dimObject);
  }, []);

  const updateDebounced = useCallback(
    _.debounce(() => {
      updateLogic();
    }, 500),
    []
  );

  const update = useCallback(() => {
    if (props.ignoreDebounce) {
      updateLogic();
    } else {
      updateDebounced();
    }
  }, [props.ignoreDebounce]);

  // listen to invalidate directives
  useEffect(() => {
    return props.dimension.registerListener({
      invalidate: () => {
        update();
      }
    });
  }, []);

  // window resized
  useWindowResize({
    resized: () => {
      update();
    }
  });

  // native intersection
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      () => {
        update();
      },
      {
        root: document.body
      }
    );
    intersectionObserver.observe(props.forwardRef.current);
    return () => {
      if (props.forwardRef.current) {
        intersectionObserver.unobserve(props.forwardRef.current);
      }
      intersectionObserver.disconnect();
    };
  }, []);

  // native resize
  useEffect(() => {
    update();
    const resizeObserver = new ResizeObserver(() => {
      update();
    });
    resizeObserver.observe(props.forwardRef.current);
    return () => {
      if (props.forwardRef.current) {
        resizeObserver.unobserve(props.forwardRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);
};
