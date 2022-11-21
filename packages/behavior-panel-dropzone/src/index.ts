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
	debug?: boolean;
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
				getDropZoneForModel: options.getDropZoneForModel,
				debugModels: options.debug
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
			splitZones: [
				{
					alignment: node.parent.vertical ? Alignment.LEFT : Alignment.TOP,
					handleDrop: (model) => {
						const parent = node.parent as WorkspaceNodeModel;
						const m = new WorkspaceNodeModel();
						m.setVertical(!parent.vertical);
						m.setExpand(model.expandHorizontal, model.expandHorizontal);
						m.addModel(model);
						parent.replaceModel(node, m);
						m.addModel(node);
					}
				},
				{
					alignment: node.parent.vertical ? Alignment.RIGHT : Alignment.BOTTOM,
					handleDrop: (model) => {
						const parent = node.parent as WorkspaceNodeModel;
						const m = new WorkspaceNodeModel();
						m.setVertical(!parent.vertical);
						m.setExpand(model.expandHorizontal, model.expandHorizontal);
						m.addModel(model);
						parent.replaceModel(node, m);
						m.addModel(node, 0);
					}
				}
			]
		};
	}
};

export * from './DropZoneLayerPanelWidget';
export * from './DropZoneLayerButtonWidget';
export * from './DropZoneAlignmentButtonWidget';
export * from './DropZoneLayer';
