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
  const rootModelKeys = useRef(new WeakMap<object, number>());
  const nextRootModelKey = useRef(0);

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

  const rootModel = props.model.getRootModel();
  let rootModelKey = rootModelKeys.current.get(rootModel);
  if (rootModelKey == null) {
    rootModelKey = nextRootModelKey.current++;
    rootModelKeys.current.set(rootModel, rootModelKey);
  }

  return (
    <UseMouseDragEventsRootWidget forwardRef={ref_container}>
      <S.Container ref={ref_container}>
        <React.Fragment key={rootModelKey}>
          {props.engine.getFactory(rootModel).generateContent({
            engine: props.engine,
            model: rootModel
          })}
          <S.LayerManager engine={props.engine} layerManager={props.engine.layerManager} model={rootModel} />
        </React.Fragment>
      </S.Container>
    </UseMouseDragEventsRootWidget>
  );
};
