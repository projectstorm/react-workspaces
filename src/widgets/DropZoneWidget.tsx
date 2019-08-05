import * as React from 'react';
import { DraggableWidget } from './DraggableWidget';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { WorkspaceModel } from '../models/WorkspaceModel';
import styled from "@emotion/styled";
import {css, keyframes} from "@emotion/core";

export interface DropZoneWidgetProps {
	dropped?: (model: WorkspaceModel) => any;
	hover?: (entered: boolean) => any;
	engine: WorkspaceEngine;
	disallow?: boolean;
	vertical: boolean;
}

export interface DropZoneWidgetState {
	hoverActive: boolean;
}

const threshold = 2;

namespace S{
	const fade = keyframes`
		0% {
			background: mediumpurple;
		}

		100% {
			background: rgba(mediumpurple, 0);
		}
	`;

	const hint = css`
		animation-name: ${fade};
		animation-duration: 0.5s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
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
		margin-left: ${threshold/2}px;
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
		margin-top: ${threshold/2}px;
		background: linear-gradient(
			180deg,
			rgba(0, 192, 255, 0.2) 0%,
			rgba(0, 192, 255, 1) 50%,
			rgba(0, 192, 255, 0.2) 100%
		);
	`;

	export const Floating = styled.div<{active: boolean, vertical: boolean}>`
		position: absolute;
		opacity: 0;
		z-index: 2;
		${p => p.active && floatingActive};
		${p => p.vertical ? floatingVertical : floatingHorizontal};
	`;

	export const DropZone = styled.div<{hint: boolean, active: boolean}>`
		transition: opacity 0.2s;
		pointer-events: all;
		min-width: ${threshold}px;
		min-height: ${threshold}px;
		background: rgba(mediumpurple, 0);
		position: relative;
		${p => p.active && active};
		${p => p.hint && hint};
	`
}


export class DropZoneWidget extends React.Component<DropZoneWidgetProps, DropZoneWidgetState> {
	constructor(props: DropZoneWidgetProps) {
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
				onDrop={event => {
					event.persist();
					let data = event.dataTransfer.getData(WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME));
					try {
						let object = JSON.parse(data);
						const factory = this.props.engine.getFactory(object.type);
						const draggingNode = factory.generateModel();
						draggingNode.fromArray(object, this.props.engine);
						this.props.dropped && this.props.dropped(draggingNode);
					} catch (ex) {
						console.log('could not restore draggable payload', ex);
					}
					this.setState({ hoverActive: false });
					this.props.hover && this.props.hover(false);
				}}
				onDragOver={event => {
					let found = false;
					for (var i = 0; i < event.dataTransfer.types.length; ++i) {
						// allow the effect
						if (event.dataTransfer.types[i] === WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME)) {
							found = true;
						}
					}

					if (!found) {
						return;
					}

					event.preventDefault();
					event.dataTransfer.dropEffect = 'move';

					if (!this.state.hoverActive) {
						this.setState({ hoverActive: true });
						this.props.hover && this.props.hover(true);
					}
				}}
				onDragLeave={() => {
					this.setState({ hoverActive: false });
					this.props.hover && this.props.hover(false);
				}}
			/>
		);
	}

	render() {
		return (
			<S.DropZone
				active={!this.props.disallow && this.state.hoverActive}
				hint={!this.props.disallow && !this.state.hoverActive && !!this.props.engine.draggingID}
				style={{
					animationDelay: `${parseInt(`${Math.random() * 500}`)}ms`
				}}
			>
				{this.getHover()}
			</S.DropZone>
		);
	}
}
