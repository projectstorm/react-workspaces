import { WorkspaceModel, SerializedModel, WorkspaceModelListener } from './WorkspaceModel';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';
import { WorkspaceModelFactory } from '../core/WorkspaceModelFactory';
import * as _ from 'lodash';
import { Alignment } from '../core/tools';

export interface SerializedCollectionModel extends SerializedModel {
	children: SerializedModel[];
	type: string;
}

export interface WorkspaceCollectionModelListener extends WorkspaceModelListener {
	childRemoved?: (node: WorkspaceModel) => any;
}

export class WorkspaceCollectionModel<
		T extends WorkspaceModel = WorkspaceModel,
		S extends SerializedCollectionModel = SerializedCollectionModel,
		L extends WorkspaceCollectionModelListener = WorkspaceCollectionModelListener
	>
	extends WorkspaceModel<S, L>
	implements WorkspaceCollectionInterface {
	children: T[];
	childrenListeners: Set<() => any>;

	constructor(type: string) {
		super(type);
		this.children = [];
		this.childrenListeners = new Set();
	}

	fromArray(payload: S, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		for (let child of payload.children) {
			let factory: WorkspaceModelFactory;
			try {
				factory = engine.getFactory(child.type);
			} catch (ex) {
				continue;
			}

			let model: any = factory.generateModel();
			model.fromArray(child, engine);
			this.addModel(model);
		}
	}

	toArray(): S {
		return {
			...super.toArray(),
			children: this.children.map((child) => {
				return child.toArray();
			})
		} as S;
	}

	isFirstModel(model: T): boolean {
		return this.children[0].id === model.id;
	}

	isLastModel(model: T): boolean {
		return this.children[this.children.length - 1].id === model.id;
	}

	flatten() {
		const children = _.flatMap(this.children.map((c) => c.flatten()));
		return super.flatten().concat(children);
	}

	getFlattened(): WorkspaceModel[] {
		let children = [];
		for (let child of this.children) {
			if (child instanceof WorkspaceCollectionModel) {
				children = children.concat(child.getFlattened());
			} else {
				children.push(child);
			}
		}
		return children;
	}

	replaceModel(oldModel: T, newModel): this {
		let index = this.children.indexOf(oldModel);
		this.removeModel(oldModel, false);
		this.addModel(newModel, index);
		return this;
	}

	getModelBefore(model: T) {
		const index = this.children.indexOf(model);
		if (index <= 0) {
			return null;
		}
		return this.children[index - 1];
	}

	getModelAfter(model: T) {
		const index = this.children.indexOf(model);
		if (index >= this.children.length - 1) {
			return null;
		}
		return this.children[index + 1];
	}

	delete() {
		// delete all the children
		this.childrenListeners.forEach((l) => l());
		for (let child of this.children) {
			child.delete();
		}
		super.delete();
	}

	normalize() {
		if (this.parent && this.children.length === 0) {
			this.parent.removeModel(this);
		}
	}

	removeModel(model: T, runNormalizationChecks: boolean = true): this {
		let index = this.children.indexOf(model);
		if (index === -1) {
			console.log('could not find model');
			return this;
		}
		this.children.splice(index, 1);
		if (runNormalizationChecks) {
			this.normalize();
		}
		return this;
	}

	addModel(model: T, position: number = null): this {
		model.setParent(this);

		// allow a child to remove itself
		const listener = model.registerListener({
			removed: () => {
				listener();
				this.childrenListeners.delete(listener);
				this.removeModel(model);
				this.iterateListeners((list) => {
					list.childRemoved?.(model);
				});
			},
			layoutInvalidated: () => {
				this.invalidateLayout();
			}
		});
		this.childrenListeners.add(listener);

		if (position === null) {
			this.children.push(model);
		} else {
			this.children.splice(position, 0, model);
		}
		return this;
	}

	addModelBefore(relativeModel: T, model: T) {
		let index = this.children.indexOf(relativeModel);
		this.addModel(model, index);
	}

	addModelAfter(relativeModel: T, model: T) {
		let index = this.children.indexOf(relativeModel);
		this.addModel(model, index + 1);
	}

	getChildSibling(model: WorkspaceModel, alignment: Alignment): WorkspaceModel {
		return null;
	}
}
