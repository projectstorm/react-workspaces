import * as React from 'react';
import { Layer, useForceUpdate, WorkspaceCollectionModel, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { useEffect } from 'react';
import { DropZoneLayerPanelWidget } from './DropZoneLayerPanelWidget';

export class DropZoneLayer extends Layer {
	constructor(public modelID: string) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <DropZoneLayerWidget engine={event.engine} draggingModel={this.modelID} />;
	}
}

export interface DropZoneLayerWidgetProps {
	engine: WorkspaceEngine;
	draggingModel: string;
}

export const DropZoneLayerWidget: React.FC<DropZoneLayerWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate(true);

	// TODO rerun this when models added
	useEffect(() => {
		const listeners = props.engine.rootModel.flatten().map((m) =>
			m.registerListener({
				visibilityChanged: () => {
					forceUpdate();
				}
			})
		);
		return () => {
			listeners.forEach((l) => l());
		};
	}, []);

	const draggingModelFlattened =
		props.engine.rootModel
			.flatten()
			.find((m) => m.id === props.draggingModel)
			?.flatten() || [];

	return (
		<>
			{props.engine.rootModel
				.flatten()
				.filter((m) => m.r_visible)
				.filter((m) => {
					// filter out the dragging model and its children (cant add parent to children)
					return !draggingModelFlattened.find((child) => child.id === m.id);
				})
				// dont show a drop zone for the same model
				// .filter((m) => m.id !== props.draggingModel.id)
				.map((m) => {
					if (!(m instanceof WorkspaceCollectionModel)) {
						return <DropZoneLayerPanelWidget engine={props.engine} model={m} key={m.id} />;
					}
					return null;
				})}
		</>
	);
};
