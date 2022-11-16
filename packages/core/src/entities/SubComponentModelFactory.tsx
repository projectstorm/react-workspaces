import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceModelFactory } from '../core/WorkspaceModelFactory';

export interface SubComponentRenderer<T extends WorkspaceModel = WorkspaceModel> {
	matchModel(model: T): boolean;
}

export abstract class SubComponentModelFactory<
	T extends WorkspaceModel,
	R extends SubComponentRenderer
> extends WorkspaceModelFactory {
	renderers: Set<R>;

	constructor(type: string) {
		super(type);
		this.renderers = new Set();
	}

	addRenderer(r: R) {
		this.renderers.add(r);
	}

	getRendererForModel(model: WorkspaceModel): R {
		for (let r of this.renderers.values()) {
			if (r.matchModel(model)) {
				return r;
			}
		}
	}
}
