import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngine } from './WorkspaceEngine';

export interface GenerateEvent<T extends WorkspaceModel> {
	engine: WorkspaceEngine;
	model: T;
}

export interface RenderContentEvent<T extends WorkspaceModel> extends GenerateEvent<T> {
	renderContentOnly: boolean;
}

export abstract class WorkspaceModelFactory<T extends WorkspaceModel = WorkspaceModel> {
	type: string;

	constructor(type: string) {
		this.type = type;
	}

	abstract generateModel(): T;

	abstract generateContent(event: RenderContentEvent<T>): JSX.Element;
}
