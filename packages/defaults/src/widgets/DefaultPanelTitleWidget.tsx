import * as React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DefaultPanelTitleWidgetProps {
  title: string;
  close: () => any;
}

namespace S {
  export const Container = styled.div`
    user-select: none;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    font-size: 13px;
    color: white;
    min-width: 100px;
    display: flex;
    align-items: center;

    &:hover {
      background: black;
    }
  `;

  export const Title = styled.div`
    flex-grow: 1;
  `;

  export const Close = styled.div`
    opacity: 0.5;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 14px;
  `;
}

export class DefaultPanelTitleWidget extends React.Component<DefaultPanelTitleWidgetProps> {
  render() {
    return (
      <S.Container>
        <S.Title>{this.props.title}</S.Title>
        <S.Close onClick={this.props.close}>
          <FontAwesomeIcon icon="times" />
        </S.Close>
      </S.Container>
    );
  }
}
