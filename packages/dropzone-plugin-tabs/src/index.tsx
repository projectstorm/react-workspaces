import * as React from 'react';
import { WorkspaceCollectionModel, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import {
	DropZoneLayerButtonWidget,
	DropZonePanelDirective,
	TransformZone
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faLayerGroup);

export const TabZone: TransformZone = {
	key: 'ADD_TAB',
	render: ({ entered }) => {
		return <DropZoneLayerButtonWidget entered={entered} text="Add Tab" icon="plus" />;
	},
	transform: ({ model, zoneModel, engine }) => {
		(zoneModel.parent as WorkspaceTabModel).addModel(model);
		engine.normalize();
	}
};

export const ConvertToTabZone: TransformZone = {
	key: 'MAKE_TABS',
	render: ({ entered }) => {
		return <DropZoneLayerButtonWidget entered={entered} text="Tab group" icon="layer-group" />;
	},
	transform: ({ model, zoneModel, engine }) => {
		const tabs = new WorkspaceTabModel();
		(zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, tabs);
		tabs.addModel(zoneModel);
		tabs.addModel(model);
		engine.normalize();
	}
};

export const getDirectiveForTabModel = (
	node: WorkspaceModel,
	transformZones: TransformZone[]
): DropZonePanelDirective | null => {
	if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTabModel) {
		return {
			transformZones: transformZones,
			splitZones: []
		};
	}
};
