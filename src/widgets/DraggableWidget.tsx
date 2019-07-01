import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { WorkspaceModel } from '../models/WorkspaceModel';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { WorkspaceCollectionModel } from '../models/WorkspaceCollectionModel';

export interface DraggableWidgetProps extends BaseWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
	className?: string;
	onClick?: () => any;
	fullscreenEnabled?: boolean;
}

export class DraggableWidget extends BaseWidget<DraggableWidgetProps> {
	static WORKSPACE_MIME = 'panel';

	constructor(props) {
		super('srw-draggable', props);
	}

	render() {
		return (
			<div
				{...this.getProps()}
				draggable={true}
				onDragStart={event => {
					event.dataTransfer.setData(
						WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME),
						JSON.stringify(this.props.model.toArray())
					);
					event.dataTransfer.setData(WorkspaceEngine.namespaceMime(`id/${this.props.model.id}`), '');
				}}
				onDragEnd={event => {
					if (event.dataTransfer.dropEffect !== 'none') {
						this.props.model.delete();
						// delete the node
						if (
							this.props.model.parent &&
							this.props.model.parent.parent &&
							this.props.model.parent.children.length === 1
						) {
							(this.props.model.parent.parent as WorkspaceCollectionModel).replaceModel(
								this.props.model.parent,
								this.props.model.parent.children[0]
							);
						}
					}
					this.props.engine.setDraggingNode(null);
				}}
				{...this.props}>
				{this.props.children}
			</div>
		);
	}
}
