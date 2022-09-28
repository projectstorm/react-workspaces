import * as React from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';

export interface DraggableWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
	className?: string;
	onClick?: () => any;
	forwardRef?: React.RefObject<HTMLDivElement>;
}

namespace S {
	export const Draggable = styled.div<{ draggable: boolean }>`
		cursor: ${(p) => (p.draggable ? 'move' : 'pointer')};
	`;
}

export class DraggableWidget extends React.Component<React.PropsWithChildren<DraggableWidgetProps>> {
	static WORKSPACE_MIME = 'panel';

	render() {
		return (
			<S.Draggable
				ref={this.props.forwardRef}
				draggable={this.props.engine.dragAndDropEnabled}
				onDragStart={(event) => {
					event.stopPropagation();
					this.props.engine.iterateListeners((list) => {
						list.draggingElement && list.draggingElement(this.props.model, true);
					});
					event.dataTransfer.setData(
						WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME),
						JSON.stringify(this.props.model.toArray())
					);
					if (event.altKey) {
						event.dataTransfer.effectAllowed = 'copy';
					}
					event.dataTransfer.setData(WorkspaceEngine.namespaceMime(`id/${this.props.model.id}`), '');
				}}
				onDragEnd={(event) => {
					event.stopPropagation();
					if (event.dataTransfer.dropEffect === 'move') {
						this.props.model.delete();
						this.props.engine.fireModelUpdated();
					}
					this.props.engine.setDraggingNode(null);
					this.props.engine.iterateListeners((list) => {
						list.draggingElement && list.draggingElement(this.props.model, false);
					});
				}}
				{...this.props}
			>
				{this.props.children}
			</S.Draggable>
		);
	}
}
