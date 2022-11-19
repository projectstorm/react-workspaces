import * as React from 'react';
import { useEffect } from 'react';
import { Layer, useForceUpdate, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import { DropZoneLayerPanelWidget, DropZonePanelDirective } from './DropZoneLayerPanelWidget';

export interface DropZoneLayerOptions {
	getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
	modelID: string;
}

export class DropZoneLayer extends Layer {
	constructor(private options2: DropZoneLayerOptions) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return (
			<DropZoneLayerWidget
				engine={event.engine}
				draggingModel={this.options2.modelID}
				getDropZoneForModel={this.options2.getDropZoneForModel}
			/>
		);
	}
}

export interface DropZoneLayerWidgetProps {
	engine: WorkspaceEngine;
	getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
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
					const directive = props.getDropZoneForModel(m);

					if (!directive) {
						return null;
					}

					return <DropZoneLayerPanelWidget directive={directive} engine={props.engine} model={m} key={m.id} />;
				})}
		</>
	);
};
