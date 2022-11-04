import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from './DropZoneLayer';

export const draggingItemBehavior = (engine: WorkspaceEngine) => {
	let layer: DropZoneLayer = null;
	engine.registerListener({
		modelDragStart: () => {
			if (layer) {
				return;
			}
			layer = new DropZoneLayer(engine.draggingID);
			engine.layerManager.addLayer(layer);
		},
		modelDragEnd: () => {
			layer?.remove();
			layer = null;
		}
	});
};

export * from './DropZoneLayerPanelWidget';
export * from './DropZoneLayerButtonWidget';
export * from './DropZoneAlignmentButtonWidget';
export * from './DropZoneLayer';
