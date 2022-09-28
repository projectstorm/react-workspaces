import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { DraggableWidget } from './DraggableWidget';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { regenerateIDs } from '../../core/tools';

export interface DropzoneLogicWidgetProps {
	onDrop: (model?: WorkspaceModel) => any;
	onDragEnter: (entered: boolean) => any;
	engine: WorkspaceEngine;
	className?;
}

export interface DropzoneLogicWidgetState {
	enter: boolean;
}

namespace S {
	export const Container = styled.div``;
}

export class DropzoneLogicWidget extends React.Component<
	React.PropsWithChildren<DropzoneLogicWidgetProps>,
	DropzoneLogicWidgetState
> {
	constructor(props: DropzoneLogicWidgetProps) {
		super(props);
		this.state = {
			enter: false
		};
	}

	render() {
		return (
			<S.Container
				className={this.props.className}
				onDrop={(event) => {
					event.persist();
					let data = event.dataTransfer.getData(WorkspaceEngine.namespaceMime(DraggableWidget.WORKSPACE_MIME));
					try {
						let object = JSON.parse(data);
						const factory = this.props.engine.getFactory(object.type);
						const draggingNode = factory.generateModel();
						draggingNode.fromArray(object, this.props.engine);

						// recursively update models because this is a clone operation
						if (event.dataTransfer.effectAllowed === 'copy') {
							regenerateIDs(draggingNode);
						}
						this.props.onDrop(draggingNode);
						return;
					} catch (ex) {
						console.log('could not restore draggable payload', ex);
					}
					this.props.onDrop(null);
				}}
				onDragOver={(event) => {
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
					if (!!event.altKey) {
						event.dataTransfer.dropEffect = 'copy';
					} else {
						event.dataTransfer.dropEffect = 'move';
					}

					if (!this.state.enter) {
						this.setState({ enter: true }, () => {
							this.props.onDragEnter(true);
						});
					}
				}}
				onDragLeave={() => {
					this.setState({ enter: false }, () => {
						this.props.onDragEnter(false);
					});
				}}
			>
				{this.props.children}
			</S.Container>
		);
	}
}
