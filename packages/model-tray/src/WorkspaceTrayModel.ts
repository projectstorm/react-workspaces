import { WorkspaceEngine, WorkspaceModel, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';

export enum WorkspaceTrayMode {
	COLLAPSED = 'micro',
	NORMAL = 'expand'
}

export interface WorkspaceTrayModelOptions {
	iconWidth: number;
}

export class WorkspaceTrayModel extends WorkspaceNodeModel {
	mode: WorkspaceTrayMode;
	floatingModel: WorkspaceModel;

	private normalSize: number;

	static NAME = 'srw-tray';

	constructor(public options: WorkspaceTrayModelOptions) {
		super(WorkspaceTrayModel.NAME);
		this.floatingModel = null;
		this.size.registerListener({
			updated: () => {
				if (this.mode === WorkspaceTrayMode.NORMAL) {
					this.normalSize = this.size.width;
				}
			}
		});
		this.setMode(WorkspaceTrayMode.NORMAL);
	}

	toArray() {
		return {
			...super.toArray(),
			mode: this.mode
		};
	}

	fromArray(payload: any, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		this.setMode(payload['mode']);
	}

	removeModel(model: WorkspaceModel, runNormalizationChecks: boolean = true): this {
		super.removeModel(model, runNormalizationChecks);
		if (this.floatingModel && this.floatingModel === model) {
			this.floatingModel = null;
		}
		return this;
	}

	setMode(mode: WorkspaceTrayMode): this {
		this.mode = mode;

		//lock in all the sizes when collapsed
		if (this.mode === WorkspaceTrayMode.COLLAPSED) {
			this.size.update({
				width: this.options.iconWidth
			});
			this.maximumSize.update({
				width: this.options.iconWidth
			});
			this.minimumSize.update({
				width: this.options.iconWidth
			});
		} else {
			this.maximumSize.update({
				width: 0
			});
			this.minimumSize.update({
				width: 0
			});
			this.size.update({
				width: this.normalSize
			});
		}
		this.invalidateLayout();
		return this;
	}

	setFloatingModel(model: WorkspaceModel | null): this {
		this.floatingModel = model;
		return this;
	}
}
