import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngine } from './WorkspaceEngine';

export interface WorkspaceModelFactoryEvent<T extends WorkspaceModel> {
	engine: WorkspaceEngine;
	model: T;
}

export abstract class WorkspaceModelFactory<
	T extends WorkspaceModel = WorkspaceModel,
	E extends WorkspaceModelFactoryEvent<T> = WorkspaceModelFactoryEvent<T>
> {
	type: string;

	constructor(type: string) {
		this.type = type;
	}

	abstract generateModel(): T;

	abstract generateContent(event: E): JSX.Element;
}
