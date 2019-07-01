import { WorkspaceModel, SerializedModel, WorkspaceModelListener } from './WorkspaceModel';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { WorkspaceCollectionInterface } from './WorkspaceCollectionInterface';

export interface SerializedCollectionModel extends SerializedModel {
	children: SerializedModel[];
	type: string;
}

export class WorkspaceCollectionModel<
	T extends WorkspaceModel<SerializedModel> = WorkspaceModel<SerializedModel>,
	S extends SerializedCollectionModel = SerializedCollectionModel
> extends WorkspaceModel<S> implements WorkspaceCollectionInterface {
	children: T[];
	childrenListeners: { [id: string]: () => any };

	constructor(type: string) {
		super(type);
		this.children = [];
		this.childrenListeners = {};
	}

	fromArray(payload: S, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		for (let child of payload.children) {
			let model: any = engine.getFactory(child.type).generateModel();

			model.fromArray(child, engine);
			this.addModel(model);
		}
	}

	toArray(): S {
		return {
			...super.toArray(),
			children: this.children.map(child => {
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
		this.removeModel(oldModel);
		this.addModel(newModel, index);
		return this;
	}

	delete() {
		// delete all the children
		for (let child of this.children) {
			child.delete();
		}
		super.delete();
	}

	removeModel(model: T): this {
		let index = this.children.indexOf(model);
		if (index === -1) {
			console.log('could not find model');
			return this;
		}
		this.children.splice(index, 1);
		if (this.children.length === 0) {
			this.parent.removeModel(this);
		}
		return this;
	}

	addModel(model: T, position: number = null): this {
		model.setParent(this);

		// allow a child to remove itself
		this.childrenListeners[model.id] = model.registerListener({
			removed: () => {
				this.removeModel(model);
			}
		});

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
}
