import * as React from 'react';
import styled from '@emotion/styled';
import { useDroppableModel, useMouseDragEvents, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { useRef, useState } from 'react';
import { TransformZone } from './DropZoneLayerPanelWidget';
import { WorkspaceModel } from '@projectstorm/react-workspaces-core';
import { DropZoneLayerButtonTheme } from './DropZoneLayerButtonWidget';

export interface DropZoneTransformWidgetProps {
  engine: WorkspaceEngine;
  zone: TransformZone;
  model: WorkspaceModel;
  theme: Partial<DropZoneLayerButtonTheme>;
}

export const DropZoneTransformWidget: React.FC<DropZoneTransformWidgetProps> = (props) => {
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useMouseDragEvents({
    forwardRef: ref,
    mouseEnter: () => {
      setEntered(true);
    },
    mouseExit: () => {
      setEntered(false);
    }
  });
  useDroppableModel({
    forwardRef: ref,
    engine: props.engine,
    onDrop: (model) => {
      props.zone.transform({
        model,
        zoneModel: props.model,
        engine: props.engine
      });
    }
  });
  return <S.Container ref={ref}>{props.zone.render({ entered, theme: props.theme })}</S.Container>;
};
namespace S {
  export const Container = styled.div``;
}
