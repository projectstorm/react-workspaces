import * as React from "react";
import styled from "@emotion/styled";

namespace S {
  export const Container = styled.div`
    background: rgba(0,0,0, 0.3);
		padding: 10px;
		color: rgba(255,255,255, 0.4);
		font-size: 13px;
		flex-grow: 1;
  `;
}

export class DefaultPanelContentWidget extends React.Component {

  render() {
    return (
      <S.Container>
				{this.props.children}
      </S.Container>
    );
  }
}
