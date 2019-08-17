/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { WorkspaceModel } from '../../models/WorkspaceModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { DropzoneLogicWidget } from '../primitives/DropzoneLogicWidget';

export interface DropzoneDividerWidgetProps {
	size?: number;
	dropped?: (model: WorkspaceModel) => any;
	entered?: (entered: boolean) => any;
	vertical: boolean;
	engine: WorkspaceEngine;
}

export interface DropzoneDividerWidgetState {
	hover: boolean;
}

namespace S {
	const animation = '0.2s';

	const _Container = css`
		position: relative;
		transition: width ${animation}, height ${animation};
		align-self: stretch;
	`;

	export const ContainerH = styled.div<{ enter: boolean; size: number }>`
		${_Container};
		width: ${p => (p.enter ? p.size : 0)}px;
	`;

	export const ContainerV = styled.div<{ enter: boolean; size: number }>`
		${_Container};
		height: ${p => (p.enter ? p.size : 0)}px;
	`;

	const _Overlay = css`
		position: absolute;
		z-index: 2;
		transition: width ${animation}, height ${animation};
		//border: solid 1px red;
	`;

	export const _Drop = css`
		height: 100%;
		width: 100%;
	`;

	export const OverlayH = styled.div<{ enter: boolean; size: number }>`
		${_Overlay};
		left: 50%;
		transform: translateX(-50%);
		width: ${p => (p.enter ? p.size * 2 : p.size)}px;
		top: -20px;
		bottom: -20px;
	`;

	export const OverlayV = styled.div<{ enter: boolean; size: number }>`
		${_Overlay};
		top: 50%;
		transform: translateY(-50%);
		left: -20px;
		right: -20px;
		height: ${p => (p.enter ? p.size * 2 : p.size)}px;
	`;
}

export class DropzoneDividerWidget extends React.Component<DropzoneDividerWidgetProps, DropzoneDividerWidgetState> {
	constructor(props: DropzoneDividerWidgetProps) {
		super(props);
		this.state = {
			hover: false
		};
	}

	getDropZone() {
		return (
			<DropzoneLogicWidget
				css={S._Drop}
				engine={this.props.engine}
				onDrop={this.props.dropped}
				onDragEnter={entered => {
					this.props.entered(entered);
					this.setState({
						hover: entered
					});
				}}
			/>
		);
	}

	render() {
		const Container: any = {
			size: this.props.size || 30,
			enter: this.state.hover
		};
		const Innner: any = {
			size: this.props.size || 30,
			enter: this.state.hover
		};

		if (this.props.vertical) {
			return (
				<S.ContainerV {...Container}>
					<S.OverlayV {...Innner}>{this.getDropZone()}</S.OverlayV>
				</S.ContainerV>
			);
		}

		return (
			<S.ContainerH {...Container}>
				<S.OverlayH {...Innner}>{this.getDropZone()}</S.OverlayH>
			</S.ContainerH>
		);
	}
}
