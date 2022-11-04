import { WorkspaceEngineInterface } from '../core/WorkspaceEngineInterface';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';
import { v4 } from 'uuid';
import { BaseListener, BaseObserver } from '../core/BaseObserver';
import { DimensionContainer } from '../core/DimensionContainer';
import { Alignment } from '../core/tools';

export interface SerializedModel {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	type: string;
	width: number;
	height: number;
}

export interface WorkspaceModelListener extends BaseListener {
	removed?: () => any;
	layoutInvalidated?: () => any;
	visibilityChanged?: () => any;
}

export class WorkspaceModel<
	T extends SerializedModel = SerializedModel,
	L extends WorkspaceModelListener = WorkspaceModelListener
> extends BaseObserver<L> {
	id: string;
	expandVertical: boolean;
	expandHorizontal: boolean;
	width: number;
	height: number;

	parent: WorkspaceCollectionInterface & WorkspaceModel;
	type: string;

	// render properties
	r_dimensions: DimensionContainer;
	r_visible: boolean;

	constructor(type: string) {
		super();
		this.type = type;
		this.id = v4();
		this.parent = null;
		this.expandHorizontal = true;
		this.expandVertical = true;
		this.listeners = {};
		this.r_visible = false;
		this.r_dimensions = new DimensionContainer();
		this.width = 0;
		this.height = 0;
		this.r_dimensions.registerListener({
			updated: () => {
				if (this.width === 0 && this.height === 0) {
					this.setWidth(this.r_dimensions.dimensions.width);
					this.setHeight(this.r_dimensions.dimensions.height);
				}
			}
		});
	}

	setWidth(width: number) {
		this.width = width;
		this.invalidateLayout();
	}

	setHeight(height: number) {
		this.height = height;
		this.invalidateLayout();
	}

	invalidateLayout() {
		this.iterateListeners((cb) => cb.layoutInvalidated?.());
	}

	setVisible(visible: boolean) {
		if (this.r_visible === visible) {
			return;
		}
		this.r_visible = visible;
		this.iterateListeners((cb) => cb.visibilityChanged?.());
	}

	fireNodeRemoved() {
		this.iterateListeners((list) => {
			if (list.removed) {
				list.removed();
			}
		});
	}

	getSibling(alignment: Alignment): WorkspaceModel | null {
		if (this.parent) {
			return this.parent.getChildSibling(this, alignment);
		}
		return null;
	}

	delete() {
		this.fireNodeRemoved();
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

	flatten(): WorkspaceModel[] {
		return [this];
	}

	toArray(): T {
		return {
			id: this.id,
			type: this.type,
			expandHorizontal: this.expandHorizontal,
			expandVertical: this.expandVertical,
			width: this.width,
			height: this.height
		} as T;
	}

	fromArray(payload: T, engine: WorkspaceEngineInterface) {
		this.id = payload.id;
		this.expandHorizontal = payload.expandHorizontal;
		this.expandVertical = payload.expandVertical;
		this.width = payload.width || 0;
		this.height = payload.height || 0;
	}
}
