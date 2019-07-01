import { WorkspaceEngineInterface } from '../WorkspaceEngineInterface';
import { uuid } from '../tools';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';

export interface SerializedModel {
	id: string;
	expand: boolean;
	type: string;
}

export interface WorkspaceModelListener {
	removed: (node: WorkspaceModel) => any;
}

export class WorkspaceModel<
	T extends SerializedModel = SerializedModel,
	L extends WorkspaceModelListener = WorkspaceModelListener
> {
	id: string;
	expand: boolean;
	parent: WorkspaceCollectionInterface & WorkspaceModel;
	type: string;

	listeners: { [id: string]: L };

	constructor(type: string) {
		this.type = type;
		this.id = uuid();
		this.parent = null;
		this.expand = true;
		this.listeners = {};
	}

	fireNodeRemoved(node: WorkspaceModel) {
		for (let id in this.listeners) {
			this.listeners[id].removed && this.listeners[id].removed(node);
		}
	}

	registerListener(listener: L) {
		const id = uuid();
		this.listeners[id] = listener;
		return () => {
			delete this.listeners[id];
		};
	}

	delete() {
		this.fireNodeRemoved(this);
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
