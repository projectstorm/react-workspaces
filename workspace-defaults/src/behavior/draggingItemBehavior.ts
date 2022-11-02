import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from '../layers/dropzone/DropZoneLayer';

export const draggingItemBehavior = (engine: WorkspaceEngine) => {
	let layer: DropZoneLayer = null;
	engine.registerListener({
		modelDragStart: () => {
			if (layer) {
				return;
			}
			layer = new DropZoneLayer();
			engine.layerManager.addLayer(layer);
		},
		modelDragEnd: () => {
			layer?.remove();
			layer = null;
		}
	});
};
