import { WorkspaceFactory } from './WorkspaceFactory';
import { WorkspaceModel } from '../core-models/WorkspaceModel';

export interface WorkspaceEngineInterface {
	getFactory<T extends WorkspaceFactory>(model: WorkspaceModel | string): T;
}
