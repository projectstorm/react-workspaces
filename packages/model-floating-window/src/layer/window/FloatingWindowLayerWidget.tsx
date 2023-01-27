import * as React from 'react';
import { useEffect, useRef } from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import {
  Alignment,
  DimensionTrackingWidget,
  IPosition,
  useForceUpdate,
  useModelElement,
  useMouseDragDistance,
  WorkspaceEngine
} from '@projectstorm/react-workspaces-core';
import styled from '@emotion/styled';
import { FloatingWindowLayer } from './FloatingWindowLayer';
import { FloatingWindowFactory } from '../../core/FloatingWindowFactory';

export interface FloatingWindowLayerWidgetProps {
  window: FloatingWindowModel;
  engine: WorkspaceEngine;
  animate: boolean;
  layer: FloatingWindowLayer;
}

export const FloatingWindowLayerWidget: React.FC<FloatingWindowLayerWidgetProps> = (props) => {
  const factory = props.engine.getFactory(props.window.child);

  const forceUpdate = useForceUpdate();
  const ref = useRef<HTMLDivElement>();
  const initialPos = useRef<Pick<IPosition, Alignment.LEFT | Alignment.TOP>>({
    left: props.window.position.left,
    top: props.window.position.top
  });

  useMouseDragDistance({
    forwardRef: ref,
    startMove: () => {
      if (!props.window.draggable) {
        return;
      }

      props.layer.setAnimate(false);
      initialPos.current = {
        top: props.window.position.top,
        left: props.window.position.left
      };
    },
    moved: ({ distanceX, distanceY }) => {
      if (!props.window.draggable) {
        return;
      }
      props.window.position.update({
        left: initialPos.current.left + distanceX,
        top: initialPos.current.top + distanceY
      });
    },
    endMove: () => {
      if (!props.window.draggable) {
        return;
      }
      props.layer.setAnimate(true);
    }
  });

  useEffect(() => {
    return props.window.registerListener({
      draggableUpdated: () => {
        forceUpdate();
      },
      childUpdated: () => {
        forceUpdate();
      }
    });
  }, [props.window]);

  useEffect(() => {
    return props.window.position.registerListener({
      updated: () => {
        if (props.animate) {
          setTimeout(() => {
            props.window.r_dimensions.invalidate();
          }, 300);
        }
      }
    });
  }, []);

  const modelRef = useModelElement({
    model: props.window,
    engine: props.engine
  });

  const windowFactory = props.engine.getFactory<FloatingWindowFactory>(props.window);

  return (
    <DimensionTrackingWidget
      forwardRef={modelRef}
      animateDuration={props.animate ? 300 : 0}
      dimension={props.window.dimension}
    >
      {windowFactory.generateContent({
        content: factory.generateContent({
          engine: props.engine,
          model: props.window.child
        }),
        titlebar: (
          <S.Title ref={ref}>
            {windowFactory
              .getRendererForModel(props.window.child)
              .renderWindowTitle({ model: props.window.child, engine: props.engine })}
          </S.Title>
        ),
        engine: props.engine,
        model: props.window
      })}
    </DimensionTrackingWidget>
  );
};
namespace S {
  export const Container = styled.div`
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    pointer-events: all;
    border: solid 1px rgb(10, 10, 10);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  `;

  export const Title = styled.div`
    cursor: move;
    user-select: none;
    flex-shrink: 0;
  `;
}
