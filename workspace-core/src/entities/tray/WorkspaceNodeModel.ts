import { WorkspaceCollectionModel } from '../../core-models/WorkspaceCollectionModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { Alignment } from '../../core/tools';

export type WorkspaceNodeModelMode = 'expand' | 'micro';

export class WorkspaceNodeModel extends WorkspaceCollectionModel {
	vertical: boolean;
	mode: WorkspaceNodeModelMode;
	floatingModel: WorkspaceModel;

	static NAME = 'srw-node';

	constructor() {
		super(WorkspaceNodeModel.NAME);
		this.vertical = true;
		this.mode = 'expand';
		this.floatingModel = null;
	}

	toArray() {
		return {
			...super.toArray(),
			mode: this.mode,
			vertical: this.vertical
		};
	}

	fromArray(payload: any, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		this.vertical = payload['vertical'];
		this.mode = payload['mode'];
	}

	removeModel(model: WorkspaceModel, runNormalizationChecks: boolean = true): this {
		super.removeModel(model, runNormalizationChecks);
		if (this.floatingModel && this.floatingModel === model) {
			this.floatingModel = null;
		}
		return this;
	}

	shouldExpand() {
		if (!this.vertical) {
			return this.expandVertical;
		}
		return this.expandHorizontal;
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
		this.invalidateLayout();
		return this;
	}

	setFloatingModel(model: WorkspaceModel | null): this {
		this.floatingModel = model;
		return this;
	}

	getModelBefore(model: WorkspaceModel) {
		const index = this.children.indexOf(model);
		if (index <= 0) {
			return null;
		}
		return this.children[index - 1];
	}

	getModelAfter(model: WorkspaceModel) {
		const index = this.children.indexOf(model);
		if (index >= this.children.length - 1) {
			return null;
		}
		return this.children[index + 1];
	}

	getChildSibling(model: WorkspaceModel, alignment: Alignment): WorkspaceModel {
		if (this.vertical && alignment === Alignment.TOP) {
			return this.getModelBefore(model);
		} else if (this.vertical && alignment === Alignment.BOTTOM) {
			return this.getModelAfter(model);
		}
		if (!this.vertical && alignment === Alignment.LEFT) {
			return this.getModelBefore(model);
		} else if (!this.vertical && alignment === Alignment.RIGHT) {
			return this.getModelAfter(model);
		}
		return null;
	}
}
