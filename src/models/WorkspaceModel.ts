import { WorkspaceEngineInterface } from '../WorkspaceEngineInterface';
import { uuid } from '../tools';

export interface SerializedModel {
	id: string;
	expand: boolean;
	type: string;
}

export class WorkspaceModel<T extends SerializedModel = SerializedModel> {
	id: string;
	expand: boolean;
	parent: any;
	type: string;

	constructor(type: string) {
		this.type = type;
		this.id = uuid();
		this.parent = null;
		this.expand = true;
	}

	hasParentID(parentID: string): boolean {
		if (this.id === parentID) {
			return true;
		}
		if (!this.parent) {
			return false;
		}
		return this.parent.hasParentID(parentID);
	}

	setParent(parent: any) {
		this.parent = parent;
	}

	setExpand(expand: boolean = true): this {
		this.expand = expand;
		return this;
	}

	toArray(): T {
		return {
			id: this.id,
			expand: this.expand,
			type: this.type
		} as T;
	}

	fromArray(payload: T, engine: WorkspaceEngineInterface) {
		this.id = payload.id;
		this.expand = payload.expand;
	}
}
