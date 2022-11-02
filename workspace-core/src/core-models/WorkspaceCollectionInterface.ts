import { WorkspaceModel } from './WorkspaceModel';
import { Alignment } from '../core/tools';

export interface WorkspaceCollectionInterface {
	children: WorkspaceModel[];
	removeModel(model: WorkspaceModel);
	addModel(model: WorkspaceModel);
	getChildSibling(model: WorkspaceModel, alignment: Alignment): WorkspaceModel | null;
}
