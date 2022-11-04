import { WorkspaceEngine, WorkspaceModel, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';

export type WorkspaceNodeModelMode = 'expand' | 'micro';

export class WorkspaceTrayModel extends WorkspaceNodeModel {
	vertical: boolean;
	mode: WorkspaceNodeModelMode;
	floatingModel: WorkspaceModel;

	static NAME = 'srw-tray';

	constructor() {
		super(WorkspaceTrayModel.NAME);
		this.vertical = true;
		this.mode = 'expand';
		this.floatingModel = null;
	}

	toArray() {
		return {
			...super.toArray(),
			mode: this.mode
		};
	}

	fromArray(payload: any, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		this.mode = payload['mode'];
	}

	removeModel(model: WorkspaceModel, runNormalizationChecks: boolean = true): this {
		super.removeModel(model, runNormalizationChecks);
		if (this.floatingModel && this.floatingModel === model) {
			this.floatingModel = null;
		}
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
}
