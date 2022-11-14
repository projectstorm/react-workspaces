import { WorkspaceEngineInterface } from '../core/WorkspaceEngineInterface';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';
import { BaseListener, BaseObserver } from '../core/BaseObserver';
import { Alignment } from '../core/tools';
import { v4 } from 'uuid';
import { ISize, Size } from '../core/dimensions/Size';
import { DimensionContainer } from '../core/dimensions/DimensionContainer';

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

	size: Size;
	minimumSize: Size;
	maximumSize: Size;

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
		this.size = new Size();
		this.maximumSize = new Size();
		this.minimumSize = new Size();
		this.r_visible = false;
		this.r_dimensions = new DimensionContainer();
		this.r_dimensions.registerListener({
			updated: () => {
				if (this.size.width === 0 && this.size.height === 0) {
					this.setSize({
						width: this.r_dimensions.dimensions.width,
						height: this.r_dimensions.dimensions.height
					});
				}
			}
		});
		this.minimumSize.registerListener({
			updated: () => {
				this.normalizeSize();
			}
		});
		this.maximumSize.registerListener({
			updated: () => {
				this.normalizeSize();
			}
		});
		this.size.registerListener({
			updated: () => {
				this.normalizeSize();
				this.invalidateLayout();
			}
		});
	}

	private normalizeSize() {
		if (this.size.width < this.minimumSize.width) {
			this.size.width = this.minimumSize.width;
		}
		if (this.size.height < this.minimumSize.height) {
			this.size.height = this.minimumSize.height;
		}

		if (this.maximumSize.width > 0 && this.size.width > this.maximumSize.width) {
			this.size.width = this.maximumSize.width;
		}
		if (this.maximumSize.height > 0 && this.size.height > this.maximumSize.height) {
			this.size.height = this.maximumSize.height;
		}
	}

	setWidth(width: number) {
		this.setSize({
			width: width
		});
	}

	setHeight(height: number) {
		this.setSize({
			height: height
		});
	}

	setSize(dims: Partial<ISize>) {
		this.size.update(dims);
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
			width: this.size.width,
			height: this.size.height
		} as T;
	}

	fromArray(payload: T, engine: WorkspaceEngineInterface) {
		this.id = payload.id;
		this.expandHorizontal = payload.expandHorizontal;
		this.expandVertical = payload.expandVertical;
		this.size.update({
			width: payload.width,
			height: payload.height
		});
	}
}
