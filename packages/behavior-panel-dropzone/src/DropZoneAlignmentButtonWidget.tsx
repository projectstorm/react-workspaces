import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';
import {
  Alignment,
  useDroppableModel,
  useMouseDragEvents,
  WorkspaceEngine,
  WorkspaceModel
} from '@projectstorm/react-workspaces-core';

export interface DropZoneAlignmentTheme {
  thickness?: number;
  thicknessIdle?: number;
  lengthIdle?: number;
  background?: string;
  backgroundEntered?: string;
}

const DefaultDropZoneAlignmentTheme: DropZoneAlignmentTheme = {
  thickness: 30,
  thicknessIdle: 13,
  lengthIdle: 60,
  background: '#0096ff',
  backgroundEntered: 'orange'
};

export interface DropZoneAlignmentButtonWidgetProps {
  alignment: Alignment;
  engine: WorkspaceEngine;
  model: WorkspaceModel;
  handleDrop: (model: WorkspaceModel) => any;
  theme?: DropZoneAlignmentTheme;
}

export const DropZoneAlignmentButtonWidget: React.FC<DropZoneAlignmentButtonWidgetProps> = (props) => {
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = _.merge({}, DefaultDropZoneAlignmentTheme, props.theme || {});
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
    onDrop: props.handleDrop
  });

  const vertical = props.alignment === Alignment.LEFT || props.alignment === Alignment.RIGHT;

  let width = theme.thicknessIdle;
  let height = theme.lengthIdle;
  if (!vertical) {
    width = theme.lengthIdle;
    height = theme.thicknessIdle;
  }

  return (
    <S.SplitContainer
      thickness={theme.thickness}
      ref={ref}
      vertical={vertical}
      alignment={props.alignment}
      hover={entered}
    >
      <S.SplitContainerIcon theme={theme} hover={entered} width={width} height={height} />
    </S.SplitContainer>
  );
};

namespace S {
  export const SplitContainer = styled.div<{
    alignment: Alignment;
    hover: boolean;
    vertical: boolean;
    thickness: number;
  }>`
    ${(p) => p.alignment}: 0;
    position: absolute;
    width: ${(p) => (p.vertical ? `${p.thickness}px` : '100%')};
    height: ${(p) => (!p.vertical ? `${p.thickness}px` : '100%')};
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  export const SplitContainerIcon = styled.div<{
    width: number;
    height: number;
    hover: boolean;
    theme: DropZoneAlignmentTheme;
  }>`
    border-radius: 2px;
    background: ${(p) => (p.hover ? p.theme.backgroundEntered : p.theme.background)};
    transition:
      background 0.3s,
      width ease-out 0.3s,
      height ease-out 0.3s;
    transition-delay: 0.1s;
    pointer-events: none;

    width: ${(p) => (p.hover ? '100%' : `${p.width}px`)};
    height: ${(p) => (p.hover ? '100%' : `${p.height}px`)};
  `;
}
