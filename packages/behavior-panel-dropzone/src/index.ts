import {
	Alignment,
	WorkspaceCollectionModel,
	WorkspaceEngine,
	WorkspaceModel,
	WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from './DropZoneLayer';
import { DropZonePanelDirective } from './DropZoneLayerPanelWidget';

export interface DraggingItemBehaviorOptions {
	getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
	engine: WorkspaceEngine;
}

export const draggingItemBehavior = (options: DraggingItemBehaviorOptions) => {
	let layer: DropZoneLayer = null;
	const { engine } = options;
	engine.registerListener({
		modelDragStart: () => {
			if (layer) {
				return;
			}
			layer = new DropZoneLayer({
				modelID: engine.draggingID,
				getDropZoneForModel: options.getDropZoneForModel
			});
			engine.layerManager.addLayer(layer);
		},
		modelDragEnd: () => {
			layer?.remove();
			layer = null;
		}
	});
};

export const getDirectiveForWorkspaceNode = (node: WorkspaceModel): DropZonePanelDirective | null => {
	if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceNodeModel) {
		return {
			splitZones: node.parent.vertical
				? [
						{
							alignment: Alignment.LEFT,
							handleDrop: (model) => {
								const m = new WorkspaceNodeModel();
								m.setVertical(false);
								m.addModel(model);
								(node.parent as WorkspaceNodeModel).replaceModel(node, m);
								m.addModel(node);
							}
						},
						{
							alignment: Alignment.RIGHT,
							handleDrop: (model) => {
								const m = new WorkspaceNodeModel();
								m.setVertical(false);
								m.addModel(model);
								(node.parent as WorkspaceNodeModel).replaceModel(node, m);
								m.addModel(node, 0);
							}
						}
				  ]
				: [
						{
							alignment: Alignment.TOP,
							handleDrop: (model) => {}
						},
						{
							alignment: Alignment.BOTTOM,
							handleDrop: (model) => {}
						}
				  ]
		};
	}
};

export * from './DropZoneLayerPanelWidget';
export * from './DropZoneLayerButtonWidget';
export * from './DropZoneAlignmentButtonWidget';
export * from './DropZoneLayer';
