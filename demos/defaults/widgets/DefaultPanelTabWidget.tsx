import * as React from "react";
import styled from "@emotion/styled";

export interface DefaultPanelTabWidgetProps {
	name: string;
	selected: boolean;
}

namespace S {
  export const Container = styled.div<{selected: boolean}>`
    user-select: none;
		padding: 5px 10px;
		font-size: 13px;
		color: white;
		min-width: 100px;
		margin-right: 2px;
		margin-top: 2px;
		transform: perspective(4px) rotateX(1deg);
		transform-origin: bottom left;
		background: ${p => p.selected ? 'rgb(0,192,255) !important': 'rgba(0,0,0, 0.5)'};

		&:hover {
			background: black;
		}
  `;
}

export class DefaultPanelTabWidget extends React.Component<DefaultPanelTabWidgetProps> {

  render() {
    return (
      <S.Container selected={this.props.selected}>
				{this.props.name}
      </S.Container>
    );
  }
}
