import * as React from 'react';
import {
	Layer,
	useForceUpdate,
	WorkspaceCollectionModel,
	WorkspaceEngine,
	WorkspaceModel,
	WorkspaceTabbedModel
} from '@projectstorm/react-workspaces-core';
import { useEffect } from 'react';
import { DropZoneLayerPanelWidget } from './DropZoneLayerPanelWidget';

export class DropZoneLayer extends Layer {
	constructor(public draggingModel: WorkspaceModel) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <DropZoneLayerWidget engine={event.engine} draggingModel={this.draggingModel} />;
	}
}

export interface DropZoneLayerWidgetProps {
	engine: WorkspaceEngine;
	draggingModel: WorkspaceModel;
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
	return (
		<>
			{props.engine.rootModel
				.flatten()
				.filter((m) => m.r_visible)
				// dont show a drop zone for the same model
				// .filter((m) => m.id !== props.draggingModel.id)
				.map((m) => {
					if (!(m instanceof WorkspaceCollectionModel)) {
						return <DropZoneLayerPanelWidget engine={props.engine} model={m} key={m.id} />;
					}
					if (m instanceof WorkspaceTabbedModel) {
						return <DropZoneLayerPanelWidget engine={props.engine} model={m} key={m.id} />;
					}
					return null;
				})}
		</>
	);
};
