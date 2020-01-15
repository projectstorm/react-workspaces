/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { DropzoneLogicWidget } from '../primitives/DropzoneLogicWidget';

export interface DropZoneLayoutDividerWidgetProps {
	dropped?: (model: WorkspaceModel) => any;
	hover?: (entered: boolean) => any;
	engine: WorkspaceEngine;
	disallow?: boolean;
	vertical: boolean;
}

export interface DropZoneLayoutDividerWidgetState {
	hoverActive: boolean;
}

const threshold = 2;

namespace S {
	const fade = keyframes`
		0% {
			background: mediumpurple;
		}

		100% {
			background: rgba(mediumpurple, 0);
		}
	`;

	const hint = css`
		// animation-name: ${fade};
		// animation-duration: 0.5s;
		// animation-iteration-count: infinite;
		// animation-direction: alternate-reverse;
		background: mediumpurple;
	`;

	const active = css`
		opacity: 1;
		background: rgb(0, 192, 255);
	`;

	const floatingActive = css`
		transition: opacity 0.5s;
		opacity: 0.5;
	`;

	const floatingVertical = css`
		height: 100%;
		width: 20px;
		transform: translateX(-50%);
		margin-left: ${threshold / 2}px;
		background: linear-gradient(
			90deg,
			rgba(0, 192, 255, 0.2) 0%,
			rgba(0, 192, 255, 1) 50%,
			rgba(0, 192, 255, 0.2) 100%
		);
	`;

	const floatingHorizontal = css`
		width: 100%;
		height: 20px;
		transform: translateY(-50%);
		margin-top: ${threshold / 2}px;
		background: linear-gradient(
			180deg,
			rgba(0, 192, 255, 0.2) 0%,
			rgba(0, 192, 255, 1) 50%,
			rgba(0, 192, 255, 0.2) 100%
		);
	`;

	export const Floating = styled.div<{ active: boolean; vertical: boolean }>`
		position: absolute;
		opacity: 0;
		z-index: 2;
		${p => p.active && floatingActive};
		${p => (p.vertical ? floatingVertical : floatingHorizontal)};
	`;

	export const Drop = css`
		height: 100%;
		width: 100%;
	`;

	export const DropZone = styled.div<{ hint: boolean; active: boolean }>`
		transition: opacity 0.2s;
		pointer-events: all;
		min-width: ${threshold}px;
		min-height: ${threshold}px;
		background: transparent;
		position: relative;
		${p => p.active && active};
		${p => p.hint && hint};
	`;
}

export class DropZoneLayoutDividerWidget extends React.Component<
	DropZoneLayoutDividerWidgetProps,
	DropZoneLayoutDividerWidgetState
> {
	constructor(props: DropZoneLayoutDividerWidgetProps) {
		super(props);
		this.state = {
			hoverActive: false
		};
	}

	getHover() {
		if (!this.props.engine.draggingID || this.props.disallow) {
			return null;
		}
		return (
			<S.Floating
				active={this.state.hoverActive}
				vertical={this.props.vertical}
				onDragLeave={() => {
					this.setState({ hoverActive: false });
					this.props.hover && this.props.hover(false);
				}}>
				<DropzoneLogicWidget
					css={S.Drop}
					engine={this.props.engine}
					onDrop={model => {
						this.props.dropped(model);
						this.setState({
							hoverActive: false
						});
					}}
					onDragEnter={entered => {
						this.setState({
							hoverActive: entered
						});
					}}
				/>
			</S.Floating>
		);
	}

	render() {
		// if drag and drop is not enabled, return null here
		if (!this.props.engine.dragAndDropEnabled) {
			return null;
		}
		return (
			<S.DropZone
				active={!this.props.disallow && this.state.hoverActive}
				hint={!this.props.disallow && !this.state.hoverActive && !!this.props.engine.draggingID}
				style={{
					animationDelay: `${parseInt(`${Math.random() * 500}`)}ms`
				}}>
				{this.getHover()}
			</S.DropZone>
		);
	}
}
