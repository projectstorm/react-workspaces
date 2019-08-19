import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';

export interface DraggableWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
	className?: string;
	onClick?: () => any;
}

namespace S {
	export const Draggable = styled.div`
		cursor: move;
	`;
}

export class DraggableWidget extends React.Component<DraggableWidgetProps> {
	static WORKSPACE_MIME = 'panel';

	render() {
		return (
			<S.Draggable
				draggable={true}
				onDragStart={event => {
					event.stopPropagation();
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
					event.stopPropagation();
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
			</S.Draggable>
		);
	}
}
