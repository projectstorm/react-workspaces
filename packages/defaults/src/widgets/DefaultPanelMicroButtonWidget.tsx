import * as React from 'react';
import styled from '@emotion/styled';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from '@emotion/react';

export interface DefaultPanelMicroButtonWidgetProps {
	icon: IconName;
	selected: boolean;
}

namespace S {
	const selected = css`
		background-color: rgb(0, 192, 255) !important;
		background-image: linear-gradient(rgba(black, 0), rgba(black, 0.2)) !important;
	`;

	export const Container = styled.div<{ selected: boolean }>`
		width: 45px;
		height: 45px;
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		${(p) => p.selected && selected}
	`;
}

export class DefaultPanelMicroButtonWidget extends React.Component<DefaultPanelMicroButtonWidgetProps> {
	render() {
		return (
			<S.Container selected={this.props.selected}>
				<FontAwesomeIcon icon={this.props.icon} />
			</S.Container>
		);
	}
}
