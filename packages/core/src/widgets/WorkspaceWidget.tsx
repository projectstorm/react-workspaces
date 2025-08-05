import * as React from 'react';
import { useEffect, useRef } from 'react';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import styled from '@emotion/styled';
import { useForceUpdate } from './hooks/useForceUpdate';
import { LayerManagerWidget } from './layers/LayerManagerWidget';
import { useDragOverModel } from './hooks/dnd-model/useDragOverModel';
import { UseMouseDragEventsRootWidget } from './hooks/dnd/useMouseDragEvents';
import { WorkspaceNodeModel } from '../entities/node/WorkspaceNodeModel';
import { useBaseResizeObserver } from './hooks/useBaseResizeObserver';

export interface WorkspaceWidgetProps {
  model: WorkspaceNodeModel;
  engine: WorkspaceEngine;
}

namespace S {
  export const Container = styled.div`
    display: flex;
    height: 100%;
    position: relative;
  `;

  export const LayerManager = styled(LayerManagerWidget)`
    width: 100%;
    height: 100%;
  `;
}

export const WorkspaceWidget: React.FC<WorkspaceWidgetProps> = (props) => {
  const ref_container = useRef<HTMLDivElement>(null);
  const timerListener = useRef(null);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    props.engine.fireRepainted();
  });

  useEffect(() => {
    props.engine.setRootModel(props.model);
  }, [props.model]);

  useBaseResizeObserver({
    forwardRef: ref_container,
    dimension: props.engine.workspaceContainer
  });

  useEffect(() => {
    props.engine.registerListener({
      layoutInvalidated: () => {
        forceUpdate();
      },
      repaint: () => {
        forceUpdate();
      }
    });
  }, []);

  useDragOverModel({
    forwardRef: ref_container,
    // don't accept the drag, but use it for data
    accept: false,
    dragOver: ({ modelID }) => {
      if (timerListener.current) {
        clearTimeout(timerListener.current);
        timerListener.current = null;
      }

      timerListener.current = setTimeout(() => {
        props.engine.setDraggingNode(null);
      }, 200);

      if (props.engine.draggingID) {
        return;
      }
      props.engine.setDraggingNode(modelID);
    }
  });

  return (
    <UseMouseDragEventsRootWidget forwardRef={ref_container}>
      <S.Container ref={ref_container}>
        {props.engine.getFactory(props.model.getRootModel()).generateContent({
          engine: props.engine,
          model: props.model.getRootModel()
        })}
        <S.LayerManager
          engine={props.engine}
          layerManager={props.engine.layerManager}
          model={props.model.getRootModel()}
        />
      </S.Container>
    </UseMouseDragEventsRootWidget>
  );
};
