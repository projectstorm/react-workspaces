import * as React from 'react';
import * as _ from 'lodash';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Alignment,
  DimensionTrackingWidget,
  UseMouseDragEventsRootWidget,
  WorkspaceEngine,
  WorkspaceModel
} from '@projectstorm/react-workspaces-core';
import { DropZoneAlignmentButtonWidget, DropZoneAlignmentTheme } from './DropZoneAlignmentButtonWidget';
import { DropZoneTransformWidget } from './DropZoneTransformWidget';
import { DropZoneLayerButtonTheme } from './DropZoneLayerButtonWidget';

export interface TransformZoneEvent {
  model: WorkspaceModel;
  zoneModel: WorkspaceModel;
  engine: WorkspaceEngine;
}

export interface TransformZone {
  transform: (event: TransformZoneEvent) => any;
  render: (options: { entered: boolean; theme: Partial<DropZoneLayerButtonTheme> }) => any;
  key: string;
}

export interface SplitZone {
  alignment: Alignment;
  handleDrop: (model: WorkspaceModel, engine: WorkspaceEngine) => any;
}

export interface DropZonePanelDirective {
  splitZones: SplitZone[];
  transformZones: TransformZone[];
}

export interface DropZoneLayerPanelTheme {
  border?: number;
  borderColor?: string;
  borderColorEntered?: string;
  background?: string;
  backgroundEntered?: string;
  borderRadius?: number;
  blur?: number;
  splitButtonTheme?: DropZoneAlignmentTheme;
  transformButtonTheme?: Partial<DropZoneLayerButtonTheme>;
}

export const DefaultDropZoneLayerPanelTheme: DropZoneLayerPanelTheme = {
  border: 2,
  blur: 0,
  borderColor: 'transparent',
  borderColorEntered: '#0096ff',
  background: 'transparent',
  borderRadius: 10,
  backgroundEntered: 'rgba(0, 0, 0, 0.4)'
};

// !------------------------------------------

export interface DropZoneLayerPanelWidgetProps {
  model: WorkspaceModel;
  engine: WorkspaceEngine;
  directive: DropZonePanelDirective;
  debug: boolean;
  theme?: DropZoneLayerPanelTheme;
}

export const DropZoneLayerPanelWidget: React.FC<DropZoneLayerPanelWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>();
  const [show, setShow] = useState(false);
  const theme = _.merge({}, DefaultDropZoneLayerPanelTheme, props.theme || {});

  return (
    <UseMouseDragEventsRootWidget
      forwardRef={ref}
      mouseEnter={() => {
        setShow(true);
      }}
      mouseExit={() => {
        setShow(false);
      }}
    >
      <S.DimensionTracking theme={theme} entered={show} dimension={props.model.r_dimensions}>
        <S.Inside ref={ref}>
          <S.Layer visible={show}>
            {props.directive.splitZones.map((d) => {
              return (
                <DropZoneAlignmentButtonWidget
                  key={d.alignment}
                  model={props.model}
                  engine={props.engine}
                  alignment={d.alignment}
                  handleDrop={(model) => {
                    d.handleDrop(model, props.engine);
                  }}
                  theme={theme.splitButtonTheme}
                />
              );
            })}
          </S.Layer>
          <S.Layer2 visible={show}>
            <S.ButtonBar>
              {props.directive.transformZones.map((zone) => {
                return (
                  <DropZoneTransformWidget
                    theme={theme.transformButtonTheme}
                    model={props.model}
                    zone={zone}
                    engine={props.engine}
                    key={zone.key}
                  />
                );
              })}
            </S.ButtonBar>
            {props.debug ? <S.Debug>{props.model.id.substring(0, 7)}</S.Debug> : null}
          </S.Layer2>
        </S.Inside>
      </S.DimensionTracking>
    </UseMouseDragEventsRootWidget>
  );
};

namespace S {
  export const DimensionTracking = styled(DimensionTrackingWidget)<{
    entered: boolean;
    theme: DropZoneLayerPanelTheme;
  }>`
    border-radius: ${(p) => p.theme.borderRadius}px;
    box-sizing: border-box;
    background: ${(p) => (p.entered ? p.theme.backgroundEntered : p.theme.background)};
    border: solid ${(p) => p.theme.border}px ${(p) => (p.entered ? p.theme.borderColorEntered : p.theme.borderColor)};
    transition: border 0.5s, background 0.5s;
    pointer-events: all;
    ${(p) => (p.theme.blur ? ` backdrop-filter: blur(${p.theme.blur}px)` : ``)};
  `;

  export const Debug = styled.span`
    font-size: 10px;
    color: white;
  `;

  export const ButtonBar = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `;

  export const Layer = styled.div<{ visible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: ${(p) => (p.visible ? 1 : 0)};
    transition: opacity 0.3s;
  `;

  export const Layer2 = styled.div<{ visible: boolean }>`
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
    pointer-events: none;
    opacity: ${(p) => (p.visible ? 1 : 0)};
    transition: opacity 0.3s;
  `;

  export const Inside = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
}
