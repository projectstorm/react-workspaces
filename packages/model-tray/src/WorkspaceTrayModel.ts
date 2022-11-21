import {
	SerializedCollectionModel,
	WorkspaceEngine,
	WorkspaceModel,
	WorkspaceNodeModel,
	WorkspaceNodeModelListener
} from '@projectstorm/react-workspaces-core';
import {
	FloatingWindowFactory,
	FloatingWindowModel,
	RootWorkspaceModel
} from '@projectstorm/react-workspaces-model-floating-window';

export enum WorkspaceTrayMode {
	COLLAPSED = 'micro',
	NORMAL = 'expand'
}

export interface WorkspaceTrayModelOptions {
	iconWidth: number;
	expandedWidth: number;
	factory: FloatingWindowFactory;
}

export interface WorkspaceTrayModelListener extends WorkspaceNodeModelListener {
	selectionChanged: () => any;
}

export interface SerializedWorkspaceTrayModel extends SerializedCollectionModel {}

export class WorkspaceTrayModel extends WorkspaceNodeModel<SerializedWorkspaceTrayModel, WorkspaceTrayModelListener> {
	mode: WorkspaceTrayMode;
	selectedModel: WorkspaceModel;
	floatingWindow: FloatingWindowModel;

	private normalSize: number;
	private childListener: () => any;

	static NAME = 'srw-tray';

	constructor(public options: WorkspaceTrayModelOptions) {
		super(WorkspaceTrayModel.NAME);
		this.selectedModel = null;
		this.floatingWindow = options.factory.generateModel();
		this.floatingWindow.registerListener({
			childUpdated: () => {
				this.floatingWindow.minimumSize.update({
					width: 100,
					height: 100
				});
				this.updateWindowPosition(this.floatingWindow.child);
				this.childListener?.();
				this.childListener = this.floatingWindow.child.r_dimensions.registerListener({
					updated: () => {
						this.updateWindowPosition(this.floatingWindow.child);
					}
				});
			}
		});
		this.normalSize = options.expandedWidth;
		this.size.registerListener({
			updated: () => {
				if (this.mode === WorkspaceTrayMode.NORMAL) {
					this.normalSize = this.size.width;
				}
			}
		});
		this.setMode(WorkspaceTrayMode.NORMAL);
	}

	getSelectedModel() {
		return this.selectedModel;
	}

	setSelectedModel(child: WorkspaceModel) {
		this.selectedModel = child;
		if (this.mode === WorkspaceTrayMode.COLLAPSED) {
			this.setFloatingModel(child);
		}
		this.iterateListeners((cb) => cb.selectionChanged?.());
	}

	updateWindowPosition(child: WorkspaceModel) {
		this.floatingWindow.position.update({
			left: -this.floatingWindow.size.width + child.r_dimensions.position.right - child.r_dimensions.size.width,
			top: child.r_dimensions.position.top
		});
	}

	delete() {
		super.delete();
		this.childListener?.();
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

	addModel(model: WorkspaceModel, position: number = null): this {
		super.addModel(model, position);
		this.normalizeSelectedModel();
		return this;
	}

	removeModel(model: WorkspaceModel, runNormalizationChecks: boolean = true): this {
		super.removeModel(model, runNormalizationChecks);
		if (this.selectedModel && this.selectedModel === model) {
			this.selectedModel = null;
		}
		this.normalizeSelectedModel();
		return this;
	}

	normalizeSelectedModel() {
		if (this.mode === WorkspaceTrayMode.NORMAL && this.selectedModel == null) {
			this.setSelectedModel(this.children[0]);
		}
	}

	setMode(mode: WorkspaceTrayMode): this {
		this.mode = mode;

		//lock in all the sizes when collapsed
		if (this.mode === WorkspaceTrayMode.COLLAPSED) {
			this.setSelectedModel(null);
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
			this.normalizeSelectedModel();
			this.setFloatingModel(null);
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

	protected _getRootModel() {
		return this.getRootModel() as RootWorkspaceModel;
	}

	setFloatingModel(model: WorkspaceModel | null): this {
		if (model === null) {
			this.floatingWindow.delete();
			return this;
		}
		this.floatingWindow.setChild(model);

		// add the window
		const root = this._getRootModel();
		if (root?.addFloatingWindow) {
			root.addFloatingWindow(this.floatingWindow);
		}
		return this;
	}
}
