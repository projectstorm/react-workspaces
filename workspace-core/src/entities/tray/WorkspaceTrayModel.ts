import { WorkspaceCollectionModel } from '../../core-models/WorkspaceCollectionModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { Alignment } from '../../core/tools';
import { DimensionContainer } from '../../core/DimensionContainer';
import { WorkspaceNodeModel } from '../node/WorkspaceNodeModel';

export type WorkspaceNodeModelMode = 'expand' | 'micro';

export class WorkspaceTrayModel extends WorkspaceNodeModel {
	vertical: boolean;
	mode: WorkspaceNodeModelMode;
	floatingModel: WorkspaceModel;

	static NAME = 'srw-tray';
	r_divisons: DimensionContainer[];

	constructor() {
		super(WorkspaceTrayModel.NAME);
		this.vertical = true;
		this.mode = 'expand';
		this.floatingModel = null;
		this.r_divisons = [];
	}

	toArray() {
		return {
			...super.toArray(),
			mode: this.mode,
			vertical: this.vertical
		};
	}

	recomputeDivisions() {
		this.r_divisons = this.children
			.map((c) => {
				return new DimensionContainer();
			})
			.concat(new DimensionContainer());
	}

	addModel(model: WorkspaceModel, position: number = null): this {
		super.addModel(model, position);
		this.recomputeDivisions();
		return this;
	}

	fromArray(payload: any, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		this.vertical = payload['vertical'];
		this.mode = payload['mode'];
	}

	removeModel(model: WorkspaceModel, runNormalizationChecks: boolean = true): this {
		super.removeModel(model, runNormalizationChecks);
		this.recomputeDivisions();
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
