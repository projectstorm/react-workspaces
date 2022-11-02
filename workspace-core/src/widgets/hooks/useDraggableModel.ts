import { SerializedModel, WorkspaceModel } from '../../core-models/WorkspaceModel';
import { useDraggable } from './useDraggable';
import { useDroppable } from './useDroppable';
import { regenerateIDs } from '../../core/tools';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export const WORKSPACE_MODEL_MIME = 'srw/model';
export interface WorkspaceModelDragEncoded {
	[WORKSPACE_MODEL_MIME]: SerializedModel;
}

export interface UseDraggableModelOptions {
	forwardRef: React.RefObject<HTMLDivElement>;
	model: WorkspaceModel;
}

export const useDraggableModel = (options: UseDraggableModelOptions) => {
	useDraggable<WorkspaceModelDragEncoded>({
		encode: () => {
			return {
				[WORKSPACE_MODEL_MIME]: options.model.toArray()
			};
		},
		forwardRef: options.forwardRef
	});
};

export interface UseDroppableModelOptions {
	forwardRef: React.RefObject<HTMLDivElement>;
	engine: WorkspaceEngine;
	onDrop: (model: WorkspaceModel) => any;
}

export const useDroppableModel = (options: UseDroppableModelOptions) => {
	useDroppable<WorkspaceModelDragEncoded>({
		acceptedTypes: [WORKSPACE_MODEL_MIME],
		dropped: (model, opts) => {
			const factory = options.engine.getFactory(model[WORKSPACE_MODEL_MIME].type);
			const draggingNode = factory.generateModel();
			draggingNode.fromArray(model[WORKSPACE_MODEL_MIME], options.engine);

			// recursively update models because this is a clone operation
			if (opts.isCopy) {
				regenerateIDs(draggingNode);
			}
			options.onDrop(draggingNode);
		},
		forwardRef: options.forwardRef
	});
};
