import * as React from 'react';
import styled from '@emotion/styled';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from '@emotion/react';

export interface DefaultPanelMicroButtonWidgetProps {
  icon: IconName;
  selected: boolean;
  smaller: boolean;
}

namespace S {
  export const Icon = styled(FontAwesomeIcon)<{ smaller: boolean }>`
    font-size: ${(p) => (p.smaller ? 14 : 20)}px;
  `;

  const selected = css`
    background-color: rgb(0, 192, 255) !important;
    background-image: linear-gradient(rgba(black, 0), rgba(black, 0.2)) !important;
  `;

  const SMALL_SIZE = 30;

  export const Container = styled.div<{ selected: boolean; smaller: boolean }>`
    min-height: ${(p) => (p.smaller ? SMALL_SIZE : 45)}px;
    ${(p) => (p.smaller ? `width: ${SMALL_SIZE}px` : '')};
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    ${(p) => p.selected && selected};
    margin-bottom: 1px;
  `;
}

export class DefaultPanelMicroButtonWidget extends React.Component<DefaultPanelMicroButtonWidgetProps> {
  render() {
    return (
      <S.Container smaller={this.props.smaller} selected={this.props.selected}>
        <S.Icon smaller={this.props.smaller} icon={this.props.icon} />
      </S.Container>
    );
  }
}
