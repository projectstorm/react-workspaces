import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { WorkspaceModel } from '../models/WorkspaceModel';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';

export interface DraggableWidgetProps extends BaseWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
	className?: string;
	onClick?: () => any;
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
					this.props.engine.itterateListeners(list => {
						list.draggingElement && list.draggingElement(this.props.model, true);
					});
					event.dataTransfer.setData(
						WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME),
						JSON.stringify(this.props.model.toArray())
					);
					event.dataTransfer.setData(WorkspaceEngine.namespaceMime(`id/${this.props.model.id}`), '');
				}}
				onDragEnd={event => {
					if (event.dataTransfer.dropEffect !== 'none') {
						this.props.model.delete();
						this.props.engine.fireModelUpdated();
					}
					this.props.engine.setDraggingNode(null);
					this.props.engine.itterateListeners(list => {
						list.draggingElement && list.draggingElement(this.props.model, false);
					});
				}}
				{...this.props}>
				{this.props.children}
			</div>
		);
	}
}
