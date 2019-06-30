import { WorkspaceEngine } from '../WorkspaceEngine';
import { AbstractWorkspaceCollectionModel } from './AbstractWorkspaceCollectionModel';

export class AbstractWorkspaceModel {
	id: string;
	parent: AbstractWorkspaceCollectionModel;
	expand: boolean;

	constructor() {
		this.id = WorkspaceEngine.generateID();
		this.parent = null;
		this.expand = true;
	}

	setParent(parent: AbstractWorkspaceCollectionModel) {
		this.parent = parent;
	}

	setExpand(expand: boolean = true): this {
		this.expand = expand;
		return this;
	}

	toArray() {
		return {
			id: this.id,
			expand: this.expand
		};
	}

	fromArray(payload: any) {
		this.id = payload.id;
		this.expand = payload.expand;
	}
}
