import * as React from 'react';
import { WorkspaceModelFactory } from './WorkspaceModelFactory';
import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceEngineInterface } from './WorkspaceEngineInterface';
import { BaseListener, BaseObserver } from './BaseObserver';
import { LayerManager } from '../widgets/layers/LayerManager';
import { DimensionContainer } from './dimensions/DimensionContainer';

export interface WorkspaceEngineListener extends BaseListener {
	repaint?: () => any;
	draggingElement?: (model: WorkspaceModel, dragging: boolean) => any;
	modelUpdated?: () => any;
	layoutInvalidated: () => any;
	layoutRepainted: () => any;
	modelDragStart: () => any;
	modelDragEnd: () => any;
}

export class WorkspaceEngineError extends Error {
	public _is__storm_workspaces_error_: true;

	constructor(m: string) {
		super(m);
		Object.setPrototypeOf(this, WorkspaceEngineError.prototype);
	}
}

export class WorkspaceEngine extends BaseObserver<WorkspaceEngineListener> implements WorkspaceEngineInterface {
	// factories
	factories: { [type: string]: WorkspaceModelFactory };
	draggingID: string;
	fullscreenModel: WorkspaceModel;
	layerManager: LayerManager;
	fireModelUpdateEvent: boolean;
	repainting: boolean;
	dragAndDropEnabled: boolean;

	// dimensions
	workspaceContainer: DimensionContainer;

	// root
	public rootModel: WorkspaceModel;
	private rootModelListener: () => any;

	constructor() {
		super();
		this.factories = {};
		this.listeners = {};
		this.draggingID = null;
		this.fullscreenModel = null;
		this.dragAndDropEnabled = true;
		this.layerManager = new LayerManager();
		this.rootModel = null;
	}

	setRootModel(model: WorkspaceModel) {
		this.rootModelListener?.();
		this.rootModelListener = model.registerListener({
			layoutInvalidated: () => {
				this.invalidateLayout();
			}
		});
		this.rootModel = model;
		this.iterateListeners((cb) => cb.modelUpdated?.());
	}

	fireRepainted() {
		this.iterateListeners((cb) => cb.layoutRepainted?.());
	}

	invalidateLayout() {
		this.iterateListeners((cb) => cb.layoutInvalidated?.());
	}

	setWorkspaceContainer(workspaceContainer: DimensionContainer) {
		this.workspaceContainer = workspaceContainer;
	}

	setDragAndDropEnabled(drag: boolean = true) {
		this.dragAndDropEnabled = drag;
		this.fireRepaintListeners();
	}

	setFullscreenModel(model: WorkspaceModel | null) {
		this.fullscreenModel = model;
		this.fireRepaintListeners();
	}

	static namespaceMime(data: string) {
		return `srw/${data}`;
	}

	fireRepaintListeners() {
		this.repainting = true;
		this.iterateListeners((list) => {
			list.repaint?.();
		});
	}

	registerFactory(factory: WorkspaceModelFactory) {
		this.factories[factory.type] = factory;
	}

	getFactory<T extends WorkspaceModelFactory>(model: WorkspaceModel | string): T {
		if (typeof model !== 'string') {
			model = model.type;
		}
		if (!this.factories[model]) {
			throw new WorkspaceEngineError('Cannot find Workspace factory for model with type: [' + model + ']');
		}
		return this.factories[model] as T;
	}

	setDraggingNode(id: string) {
		if (this.draggingID !== id) {
			this.draggingID = id;
			this.iterateListeners((cb) => cb.modelDragStart?.());
			this.fireRepaintListeners();
		} else if (id === null) {
			this.iterateListeners((cb) => cb.modelDragEnd?.());
			this.fireRepaintListeners();
		}
	}
}
