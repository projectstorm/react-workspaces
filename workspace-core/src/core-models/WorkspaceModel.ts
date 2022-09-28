import { WorkspaceEngineInterface } from '../core/WorkspaceEngineInterface';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';
import { v4 } from 'uuid';
import { BaseListener, BaseObserver } from '../core/BaseObserver';

export interface SerializedModel {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	type: string;
}

export interface WorkspaceModelListener extends BaseListener {
	removed?: (node: WorkspaceModel) => any;
}

export class WorkspaceModel<
	T extends SerializedModel = SerializedModel,
	L extends WorkspaceModelListener = WorkspaceModelListener
> extends BaseObserver<L> {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	parent: WorkspaceCollectionInterface & WorkspaceModel;
	type: string;

	constructor(type: string) {
		super();
		this.type = type;
		this.id = v4();
		this.parent = null;
		this.expandHorizontal = true;
		this.expandVertical = true;
		this.listeners = {};
	}

	fireNodeRemoved(node: WorkspaceModel) {
		this.iterateListeners((list) => {
			if (list.removed) {
				list.removed(node);
			}
		});
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
