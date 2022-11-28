import * as React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface DropZoneLayerButtonWidgetProps {
  icon: IconProp;
  text: string;
  entered: boolean;
}

export const DropZoneLayerButtonWidget: React.FC<DropZoneLayerButtonWidgetProps> = (props) => {
  return (
    <S.Container entered={props.entered}>
      <S.Icon icon={props.icon} />
      <S.Text>{props.text}</S.Text>
    </S.Container>
  );
};
namespace S {
  export const Icon = styled(FontAwesomeIcon)`
    font-size: 22px;
    color: white;
    pointer-events: none;
  `;

  export const Text = styled.div`
    font-size: 11px;
    color: white;
    padding-top: 5px;
    pointer-events: none;
  `;

  export const Container = styled.div<{ entered: boolean }>`
    border: solid 2px ${(p) => (p.entered ? 'orange' : '#0096ff')};
    box-sizing: border-box;
    background: ${(p) => (p.entered ? 'rgba(255, 165, 0, 0.56)' : 'transparent')};
    transition: border 0.3s, background 0.3s;
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
