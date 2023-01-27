import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useDraggableModel } from '../hooks/dnd-model/useDraggableModel';
import { useForceUpdate } from '../hooks/useForceUpdate';

export interface DraggableWidgetProps {
  engine: WorkspaceEngine;
  model: WorkspaceModel;
  className?: string;
  onClick?: () => any;
  forwardRef?: React.RefObject<HTMLDivElement>;
}

namespace S {
  export const Draggable = styled.div<{ draggable: boolean }>`
    cursor: ${(p) => (p.draggable ? 'move' : 'pointer')};
  `;
}

export const DraggableWidget: React.FC<React.PropsWithChildren<DraggableWidgetProps>> = (props) => {
  const ref = useRef<HTMLDivElement>();
  const forceUpdate = useForceUpdate();
  useDraggableModel({
    forwardRef: props.forwardRef || ref,
    model: props.model,
    engine: props.engine
  });
  useEffect(() => {
    return props.engine.registerListener({
      lockUpdated: () => {
        forceUpdate();
      }
    });
  }, []);

  return (
    <S.Draggable
      ref={props.forwardRef || ref}
      draggable={!props.engine.locked}
      onDragStart={(event) => {
        if (props.engine.locked) {
          return;
        }
        props.engine.iterateListeners((list) => {
          list.draggingElement && list.draggingElement(props.model, true);
        });
      }}
      onDragEnd={(event) => {
        if (props.engine.locked) {
          return;
        }
        props.engine.iterateListeners((list) => {
          list.draggingElement && list.draggingElement(props.model, false);
        });
      }}
      {...props}
    >
      {props.children}
    </S.Draggable>
  );
};
