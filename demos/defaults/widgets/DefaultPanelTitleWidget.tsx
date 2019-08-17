import * as React from "react";
import styled from "@emotion/styled";

export interface DefaultPanelTitleWidgetProps {
	title: string;
}
namespace S {
  export const Container = styled.div`
    user-select: none;
		background: rgba(0,0,0, 0.5);
		padding: 5px 10px;
		font-size: 13px;
		color: white;
		min-width: 100px;

		&:hover {
			background: black;
		}
  `;
}

export class DefaultPanelTitleWidget extends React.Component<DefaultPanelTitleWidgetProps> {

  render() {
    return (
      <S.Container>
				{this.props.title}
      </S.Container>
    );
  }
}
