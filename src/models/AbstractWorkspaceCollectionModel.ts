import {AbstractWorkspaceModel} from "./AbstractWorkspaceModel";
import {WorkspacePanelModel} from "./WorkspacePanelModel";

export class AbstractWorkspaceCollectionModel<T extends AbstractWorkspaceModel = AbstractWorkspaceModel> extends AbstractWorkspaceModel {

	children: T[];

	constructor() {
		super();
		this.children = [];
	}

	isFirstModel(model: T): boolean {
		return this.children[0].id === model.id
	}

	isLastModel(model: T): boolean {
		return this.children[this.children.length - 1].id === model.id;
	}

	getFlattened(): WorkspacePanelModel[] {
		let children = [];
		for (let child of this.children) {
			if (child instanceof AbstractWorkspaceCollectionModel) {
				children = children.concat(child.getFlattened());
			} else {
				children.push(child);
			}
		}
		return children;
	}

	removeModel(model: T): this {
		let index = this.children.indexOf(model);
		if (index === -1) {
			console.log("could not find model");
			return this;
		}
		this.children.splice(index, 1);
		//if empty remove this from the parent
		if (this.children.length === 0) {
			this.parent.removeModel(this);
		}
		return this;
	}

	addModel(model: T, position: number = null): this {
		model.setParent(this);
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
		this.addModel(model, index+1);
	}
}
