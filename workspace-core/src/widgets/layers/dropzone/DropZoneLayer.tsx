import * as React from 'react';
import { Layer } from '../LayerManager';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../../../core-models/WorkspaceCollectionModel';
import { DropZoneLayerPanelWidget } from './DropZoneLayerPanelWidget';
import { WorkspaceTabbedModel } from '../../../entities/tabs/WorkspaceTabbedModel';
import { useEffect } from 'react';
import { useForceUpdate } from '../../hooks/useForceUpdate';

export class DropZoneLayer extends Layer {
	constructor() {
		super({
			mouseEvents: true
		});
	}

	renderLayer(event): JSX.Element {
		return <DropZoneLayerWidget engine={event.engine} model={event.model} />;
	}
}

export interface DropZoneLayerWidgetProps {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
}

export const DropZoneLayerWidget: React.FC<DropZoneLayerWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate(true);

	// TODO rerun this when models added
	useEffect(() => {
		const listeners = props.model.flatten().map((m) =>
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
			{props.model
				.flatten()
				.filter((m) => m.r_visible)
				.map((m) => {
					if (!(m instanceof WorkspaceCollectionModel)) {
						return <DropZoneLayerPanelWidget model={m} />;
					}
					if (m instanceof WorkspaceTabbedModel) {
						return <DropZoneLayerPanelWidget model={m} />;
					}
					return null;
				})}
		</>
	);
};
