import * as React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as _ from 'lodash';

export interface DropZoneLayerButtonTheme {
  icon?: {
    color?: string;
    size?: number;
  };
  text?: {
    color?: string;
    size?: number;
  };
  borderSize?: number;
  borderRadius?: number;
  borderColor?: string;
  borderColorEntered?: string;
  background?: string;
  backgroundEntered?: string;
}

export const DefaultDropZoneLayerButtonTheme: DropZoneLayerButtonTheme = {
  background: 'transparent',
  backgroundEntered: 'rgba(255, 165, 0, 0.56)',
  borderColor: '#0096ff',
  borderColorEntered: 'orange',
  borderSize: 2,
  borderRadius: 5,
  icon: {
    color: 'white',
    size: 22
  },
  text: {
    color: 'white',
    size: 11
  }
};

export interface DropZoneLayerButtonWidgetProps {
  icon: IconProp;
  text: string;
  entered: boolean;
  theme?: DropZoneLayerButtonTheme;
}

export const DropZoneLayerButtonWidget: React.FC<DropZoneLayerButtonWidgetProps> = (props) => {
  const theme = _.merge({}, DefaultDropZoneLayerButtonTheme, props.theme || {});
  return (
    <S.Container theme={theme} entered={props.entered}>
      <S.Icon theme={theme} icon={props.icon} />
      <S.Text theme={theme}>{props.text}</S.Text>
    </S.Container>
  );
};

namespace S {
  export const Icon = styled(FontAwesomeIcon)<{ theme: DropZoneLayerButtonTheme }>`
    font-size: ${(p) => p.theme.icon.size}px;
    color: ${(p) => p.theme.icon.color};
    pointer-events: none;
  `;

  export const Text = styled.div<{ theme: DropZoneLayerButtonTheme }>`
    font-size: ${(p) => p.theme.text.size}px;
    color: ${(p) => p.theme.text.color};
    padding-top: 5px;
    pointer-events: none;
  `;

  export const Container = styled.div<{ entered: boolean; theme: DropZoneLayerButtonTheme }>`
    border: solid 2px ${(p) => (p.entered ? p.theme.borderColorEntered : p.theme.borderColor)};
    box-sizing: border-box;
    background: ${(p) => (p.entered ? p.theme.backgroundEntered : p.theme.background)};
    transition:
      border 0.3s,
      background 0.3s;
    pointer-events: all;
    width: 60px;
    height: 60px;
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  `;
}
