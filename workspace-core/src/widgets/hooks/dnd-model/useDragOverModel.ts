import { useDragOver } from '../dnd/useDragOver';
import { WORKSPACE_MODEL_ID_MIME, WORKSPACE_MODEL_MIME } from './useDraggableModel';

export interface UseDragOverModelProps {
	forwardRef: React.RefObject<HTMLDivElement>;
	dragOver?: (options: { modelID: string }) => any;
	accept?: boolean;
}

export const useDragOverModel = (props: UseDragOverModelProps) => {
	useDragOver({
		acceptedTypes: [WORKSPACE_MODEL_MIME],
		accept: props.accept,
		dragOver: (types) => {
			const found = types.find((t) => t.startsWith(WORKSPACE_MODEL_ID_MIME));
			if (!found) {
				return;
			}
			const id = found.substring(WORKSPACE_MODEL_ID_MIME.length);
			props.dragOver?.({
				modelID: id
			});
		},
		forwardRef: props.forwardRef
	});
};
