import { ResizeDividersLayer } from './ResizeDividersLayer';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';

export * from './ResizeDividerWidget';
export * from './ResizeDividersLayer';

export const resizingBehavior = (engine: WorkspaceEngine) => {
	const layer = new ResizeDividersLayer();
	engine.layerManager.addLayer(layer);
	engine.registerListener({
		modelDragStart: () => {
			layer.remove();
		},
		modelDragEnd: () => {
			engine.layerManager.addLayer(layer);
		}
	});
};
