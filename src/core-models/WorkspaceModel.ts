import { WorkspaceEngineInterface } from '../core/WorkspaceEngineInterface';
import { uuid } from '../core/tools';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';

export interface SerializedModel {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	type: string;
}

export interface WorkspaceModelListener {
	removed?: (node: WorkspaceModel) => any;
}

export class WorkspaceModel<
	T extends SerializedModel = SerializedModel,
	L extends WorkspaceModelListener = WorkspaceModelListener
> {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	parent: WorkspaceCollectionInterface & WorkspaceModel;
	type: string;

	listeners: { [id: string]: L };

	constructor(type: string) {
		this.type = type;
		this.id = uuid();
		this.parent = null;
		this.expandHorizontal = true;
		this.expandVertical = true;
		this.listeners = {};
	}

	itterateListeners(cb: (listener: L) => any) {
		for (let id in this.listeners) {
			cb(this.listeners[id]);
		}
	}

	fireNodeRemoved(node: WorkspaceModel) {
		this.itterateListeners(list => {
			if (list.removed) {
				list.removed(node);
			}
		});
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

	setExpand(horizontal: boolean = true, vertical: boolean = true): this {
		this.expandHorizontal = horizontal;
		this.expandVertical = vertical;
		return this;
	}

	toArray(): T {
		return {
			id: this.id,
			expandHorizontal: this.expandHorizontal,
			expandVertical: this.expandVertical,
			type: this.type
		} as T;
	}

	fromArray(payload: T, engine: WorkspaceEngineInterface) {
		this.id = payload.id;
		this.expandHorizontal = payload.expandHorizontal;
		this.expandVertical = payload.expandVertical;
	}
}
