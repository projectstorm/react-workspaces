import * as React from 'react';
import { DraggableWidget } from './DraggableWidget';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { WorkspaceModel } from '../models/WorkspaceModel';

export interface DropZoneWidgetProps extends BaseWidgetProps {
	dropped?: (model: WorkspaceModel) => any;
	hover?: (entered: boolean) => any;
	engine: WorkspaceEngine;
	disallow?: boolean;
	vertical: boolean;
}

export interface DropZoneWidgetState {
	hoverActive: boolean;
}

export class DropZoneWidget extends BaseWidget<DropZoneWidgetProps, DropZoneWidgetState> {
	constructor(props: DropZoneWidgetProps) {
		super('srw-drop-zone', props);
		this.state = {
			hoverActive: false
		};
	}

	getHover() {
		if (!this.props.engine.draggingID || this.props.disallow) {
			return null;
		}
		return (
			<div
				className={this.bem({
					__floating: true,
					'--floating-active': this.state.hoverActive,
					'--floating-vertical': this.props.vertical,
					'--floating-horizontal': !this.props.vertical
				})}
				onDrop={event => {
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
					if (this.state.hoverActive) {
						event.preventDefault();
						event.dataTransfer.dropEffect = 'move';
						return;
					}
					let found = false;
					for (var i = 0; i < event.dataTransfer.types.length; ++i) {
						// allow the effect
						if (event.dataTransfer.types[i] === WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME)) {
							found = true;
						}
					}

					if (found) {
						event.preventDefault();
						event.dataTransfer.dropEffect = 'move';
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
			<div
				style={{
					animationDelay: `${parseInt(`${Math.random() * 500}`)}ms`
				}}
				{...this.getProps({
					'--hint': !this.props.disallow && !this.state.hoverActive && !!this.props.engine.draggingID,
					'--active': !this.props.disallow && this.state.hoverActive
				})}>
				{this.getHover()}
			</div>
		);
	}
}
