import { AbstractWorkspaceCollectionModel } from './AbstractWorkspaceCollectionModel';
import { WorkspacePanelModel } from './WorkspacePanelModel';
import { AbstractWorkspaceModel } from './AbstractWorkspaceModel';

export type WorkspaceNodeModelMode = 'expand' | 'micro';

export class WorkspaceNodeModel extends AbstractWorkspaceCollectionModel {
	vertical: boolean;
	mode: WorkspaceNodeModelMode;
	floatingModel: WorkspacePanelModel;

	constructor() {
		super();
		this.vertical = false;
		this.mode = 'expand';
		this.floatingModel = null;
	}

	removeModel(model: AbstractWorkspaceModel): this {
		super.removeModel(model);
		if (this.floatingModel && this.floatingModel === model) {
			this.floatingModel = null;
		}
		return this;
	}

	setVertical(vertical: boolean = true): this {
		this.vertical = vertical;
		return this;
	}

	setHorizontal(horizontal: boolean = true): this {
		this.vertical = !horizontal;
		return this;
	}

	setMode(mode: WorkspaceNodeModelMode): this {
		this.mode = mode;
		return this;
	}

	setFloatingModel(model: WorkspacePanelModel | null): this {
		this.floatingModel = model;
		return this;
	}
}
