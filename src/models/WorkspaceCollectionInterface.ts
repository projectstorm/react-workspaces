import { WorkspaceModel } from './WorkspaceModel';

export interface WorkspaceCollectionInterface {
	children: WorkspaceModel[];
	removeModel(model: WorkspaceModel);
}
