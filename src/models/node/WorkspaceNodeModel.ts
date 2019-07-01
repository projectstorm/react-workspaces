import { WorkspaceCollectionModel } from '../WorkspaceCollectionModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { WorkspaceModel } from '../WorkspaceModel';

export type WorkspaceNodeModelMode = 'expand' | 'micro';

export class WorkspaceNodeModel extends WorkspaceCollectionModel {
	vertical: boolean;
	mode: WorkspaceNodeModelMode;
	floatingModel: WorkspaceModel;

	static NAME = 'srw-node';

	constructor() {
		super(WorkspaceNodeModel.NAME);
		this.vertical = false;
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

	removeModel(model: WorkspaceModel): this {
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

	setFloatingModel(model: WorkspaceModel | null): this {
		this.floatingModel = model;
		return this;
	}
}
