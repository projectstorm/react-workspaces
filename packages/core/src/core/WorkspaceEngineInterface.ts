import { WorkspaceModelFactory } from './WorkspaceModelFactory';
import { WorkspaceModel } from '../core-models/WorkspaceModel';

export interface WorkspaceEngineInterface {
  getFactory<T extends WorkspaceModelFactory>(model: WorkspaceModel | string): T;
}
