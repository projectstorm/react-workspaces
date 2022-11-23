import * as React from 'react';
import { WorkspaceCollectionModel, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import {
	DropZoneLayerButtonWidget,
	DropZonePanelDirective,
	TransformZone
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { WorkspaceTrayFactory, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faLayerGroup);

export const TrayZone: TransformZone = {
	key: 'ADD_ITEM',
	render: ({ entered }) => {
		return <DropZoneLayerButtonWidget entered={entered} text="Add item" icon="plus" />;
	},
	transform: ({ model, zoneModel, engine }) => {
		(zoneModel.parent as WorkspaceTrayModel).addModel(model);
		engine.normalize();
	}
};

export const ConvertToTrayZone = (trayFactory: WorkspaceTrayFactory): TransformZone => {
	return {
		key: 'MAKE_TRAY',
		render: ({ entered }) => {
			return <DropZoneLayerButtonWidget entered={entered} text="Tray group" icon="layer-group" />;
		},
		transform: ({ model, zoneModel, engine }) => {
			const trayModel = trayFactory.generateModel();
			(zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, trayModel);
			trayModel.addModel(zoneModel);
			trayModel.addModel(model);
			engine.normalize();
		}
	};
};

export const getDirectiveForTrayModel = (
	node: WorkspaceModel,
	transformZones: TransformZone[]
): DropZonePanelDirective | null => {
	if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTrayModel) {
		return {
			transformZones: transformZones,
			splitZones: []
		};
	}
};
