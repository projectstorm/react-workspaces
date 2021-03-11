/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { DropzoneLogicWidget } from '../primitives/DropzoneLogicWidget';
import { DividerContext } from './DropzoneDividerWidget';
import * as _ from 'lodash';
import Color from 'color';

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

const getTransparent = _.memoize((color, transparency) => {
	return new Color(color).alpha(transparency).toString();
});

namespace S {
	const floatingActive = css`
		transition: opacity 0.5s;
		opacity: 0.5;
	`;

	const floatingVertical = css`
		height: 100%;
		width: 20px;
		transform: translateX(-50%);
		margin-left: ${threshold / 2}px;
	`;

	const floatingHorizontal = css`
		width: 100%;
		height: 20px;
		transform: translateY(-50%);
		margin-top: ${threshold / 2}px;
	`;

	export const Floating = styled.div<{ active: boolean; vertical: boolean; color1: string; color2: string }>`
		position: absolute;
		opacity: 0;
		z-index: 2;
		${p => p.active && floatingActive};
		${p => (p.vertical ? floatingVertical : floatingHorizontal)};
		background: linear-gradient(
			${p => (p.vertical ? 90 : 180)}deg,
			${p => p.color2} 0%,
			${p => p.color1} 50%,
			${p => p.color2} 100%
		);
	`;

	export const Drop = css`
		height: 100%;
		width: 100%;
	`;

	export const DropZone = styled.div<{ active: boolean; color: string }>`
		transition: opacity 0.2s;
		pointer-events: all;
		min-width: ${threshold}px;
		min-height: ${threshold}px;
		background: transparent;
		position: relative;
		opacity: ${p => (p.active ? 1.0 : 0)};
		background: ${p => p.color};
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

	getHover(color: string) {
		if (!this.props.engine.draggingID || this.props.disallow) {
			return null;
		}
		return (
			<S.Floating
				active={this.state.hoverActive}
				vertical={this.props.vertical}
				color1={color}
				color2={getTransparent(color, 0.2)}
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
			<DividerContext.Consumer>
				{colors => {
					return (
						<S.DropZone
							active={!this.props.disallow && !!this.props.engine.draggingID}
							color={this.state.hoverActive ? colors.active : colors.hint}>
							{this.getHover(colors.active)}
						</S.DropZone>
					);
				}}
			</DividerContext.Consumer>
		);
	}
}
