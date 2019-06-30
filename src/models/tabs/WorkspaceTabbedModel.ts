import { WorkspaceCollectionModel } from '../WorkspaceCollectionModel';
import * as _ from 'lodash';
import { WorkspaceModel } from '../WorkspaceModel';

export class WorkspaceTabbedModel extends WorkspaceCollectionModel<WorkspaceModel> {
	selected: string;

	static NAME = 'tabs';

	constructor() {
		super(WorkspaceTabbedModel.NAME);
		this.selected = null;
	}

	addModel(model: WorkspaceModel, position: number = null): this {
		super.addModel(model, position);
		this.selected = this.selected || model.id;
		return this;
	}

	removeModel(model: WorkspaceModel): this {
		super.removeModel(model);
		if (this.selected === model.id && this.children.length > 0) {
			this.selected = this.children[0].id;
		}
		return this;
	}

	getSelected(): WorkspaceModel {
		return _.find(this.children, { id: this.selected });
	}

	setSelected(model: WorkspaceModel): this {
		this.selected = model.id;
		return this;
	}
}
