import { WorkspaceFactory } from './WorkspaceFactory';
import { WorkspaceModel } from './models/WorkspaceModel';

export interface WorkspaceEngineInterface {
	getFactory<T extends WorkspaceFactory>(model: WorkspaceModel | string): T;
}
