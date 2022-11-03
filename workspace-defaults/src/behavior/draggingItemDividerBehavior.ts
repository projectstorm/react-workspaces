import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from '../layers/dropzone/DropZoneLayer';
import { DropzoneDividersLayer } from '../layers/dropzone-dividers/DropzoneDividersLayer';

export const draggingItemDividerBehavior = (engine: WorkspaceEngine) => {
	let layer: DropZoneLayer = null;
	engine.registerListener({
		modelDragStart: () => {
			if (layer) {
				return;
			}
			layer = new DropzoneDividersLayer(engine.draggingID);
			engine.layerManager.addLayer(layer);
		},
		modelDragEnd: () => {
			layer?.remove();
			layer = null;
		}
	});
};
