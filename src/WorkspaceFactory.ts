import { WorkspaceModel } from './models/WorkspaceModel';

export abstract class WorkspaceFactory<T extends WorkspaceModel = WorkspaceModel> {
	type: string;

	constructor(type: string) {
		this.type = type;
	}

	abstract generateModel(): T;
}
