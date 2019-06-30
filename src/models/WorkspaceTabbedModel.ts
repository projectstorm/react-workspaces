import { AbstractWorkspaceCollectionModel } from './AbstractWorkspaceCollectionModel';
import { WorkspacePanelModel } from './WorkspacePanelModel';
import * as _ from 'lodash';

export class WorkspaceTabbedModel extends AbstractWorkspaceCollectionModel<WorkspacePanelModel> {
	selected: string;

	constructor() {
		super();
		this.selected = null;
	}

	addModel(model: WorkspacePanelModel, position: number = null): this {
		super.addModel(model, position);
		this.selected = this.selected || model.id;
		return this;
	}

	removeModel(model: WorkspacePanelModel): this {
		super.removeModel(model);
		if (this.selected === model.id && this.children.length > 0) {
			this.selected = this.children[0].id;
		}
		return this;
	}

	getSelected(): WorkspacePanelModel {
		return _.find(this.children, { id: this.selected });
	}

	setSelected(model: WorkspacePanelModel): this {
		this.selected = model.id;
		return this;
	}
}
