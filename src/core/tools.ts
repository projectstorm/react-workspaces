import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../core-models/WorkspaceCollectionModel';

export const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});

export const regenerateIDs = (model: WorkspaceModel) => {
	if (model instanceof WorkspaceCollectionModel) {
		model.children.forEach(m => regenerateIDs(m));
	}
	model.id = uuid();
};
