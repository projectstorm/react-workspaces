import { WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from './FloatingWindowModel';
import { FloatingWindowLayer } from '../layer/FloatingWindowLayer';

export class RootWorkspaceModel extends WorkspaceNodeModel {
	floatingWindows: Set<FloatingWindowModel>;
	layerListener: () => any;

	constructor(private engine: WorkspaceEngine) {
		super();
		this.floatingWindows = new Set<FloatingWindowModel>();

		// keep floating windows on-top
		this.layerListener = this.engine.layerManager.registerListener({
			layerAdded: () => {
				this.floatingWindows.forEach((w) => {
					this.engine.layerManager.layers
						.filter((l) => l instanceof FloatingWindowLayer)
						.forEach((l: FloatingWindowLayer) => {
							l.moveToTop();
						});
				});
			}
		});
	}

	dispose() {
		this.layerListener();
	}

	addFloatingWindow(window: FloatingWindowModel) {
		this.floatingWindows.add(window);
		const layer = new FloatingWindowLayer(window);
		this.engine.layerManager.addLayer(layer);
		window.setParent(this);
		window.registerListener({
			removed: () => {
				layer.remove();
				this.floatingWindows.delete(window);
			}
		});
	}
}
