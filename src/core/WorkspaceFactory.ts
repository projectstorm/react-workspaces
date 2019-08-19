import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngine } from './WorkspaceEngine';

export interface GenerateEvent<T extends WorkspaceModel> {
	engine: WorkspaceEngine;
	model: T;
}

export abstract class WorkspaceFactory<T extends WorkspaceModel = WorkspaceModel> {
	type: string;

	constructor(type: string) {
		this.type = type;
	}

	abstract generateModel(): T;
}
