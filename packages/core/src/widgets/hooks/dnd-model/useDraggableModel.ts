import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { useDroppable } from '../dnd/useDroppable';
import { SerializedModel, WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { useDraggable } from '../dnd/useDraggable';
import { log, regenerateIDs } from '../../../core/tools';
import { useDragOverModel } from './useDragOverModel';

export const WORKSPACE_MODEL_MIME = 'srw/model';
export const WORKSPACE_MODEL_ID_MIME = 'srw/modelid/';
export interface WorkspaceModelDragEncoded {
	[WORKSPACE_MODEL_MIME]: SerializedModel;
}

export interface UseDraggableModelOptions {
	forwardRef: React.RefObject<HTMLDivElement>;
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export const useDraggableModel = (props: UseDraggableModelOptions) => {
	useDraggable<WorkspaceModelDragEncoded>({
		encode: () => {
			return {
				[WORKSPACE_MODEL_MIME]: props.model.toArray(),
				[WORKSPACE_MODEL_ID_MIME + props.model.id]: props.model.id
			};
		},
		dragend: ({ copy, success }) => {
			if (success && !copy) {
				// if we get here, then the drop was on a different window, so we should remove the element
				if (!props.engine.draggingID) {
					props.model.delete();
					props.engine.normalize();
				}
			}
			props.engine.setDraggingNode(null);
		},
		forwardRef: props.forwardRef
	});
};

export interface UseDroppableModelOptions {
	forwardRef: React.RefObject<HTMLDivElement>;
	engine: WorkspaceEngine;
	onDrop: (model: WorkspaceModel) => any;
	onDragover?: (options: { modelID: string }) => any;
}

export const useDroppableModel = (props: UseDroppableModelOptions) => {
	useDragOverModel({
		dragOver: props.onDragover,
		forwardRef: props.forwardRef,
		accept: true
	});
	useDroppable<WorkspaceModelDragEncoded>({
		dropped: (model, opts) => {
			const factory = props.engine.getFactory(model[WORKSPACE_MODEL_MIME].type);
			let draggingNode = factory.generateModel();
			draggingNode.fromArray(model[WORKSPACE_MODEL_MIME], props.engine);

			// recursively update models because this is a clone operation
			if (opts.isCopy) {
				log(`was a copy operation, regenerating ids`);
				regenerateIDs(draggingNode);
			} else {
				const found = props.engine.rootModel.flatten().find((m) => m.id === draggingNode.id);
				draggingNode = found || draggingNode;
			}

			log(`workspace model dropped`, draggingNode);
			props.onDrop(draggingNode);
		},
		forwardRef: props.forwardRef
	});
};
