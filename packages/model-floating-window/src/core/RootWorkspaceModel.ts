import { WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from './FloatingWindowModel';
import { FloatingWindowLayer } from '../layer/window/FloatingWindowLayer';
import { FloatingWindowResizeLayer } from '../layer/resize/FloatingWindowResizeLayer';

export class RootWorkspaceModel extends WorkspaceNodeModel {
	floatingWindows: Set<FloatingWindowModel>;
	layerListener: () => any;

	constructor(private engine: WorkspaceEngine) {
		super();
		this.floatingWindows = new Set<FloatingWindowModel>();

		this.layerListener = this.engine.layerManager.registerListener({
			layerAdded: () => {
				// keep floating windows on-top
				this.floatingWindows.forEach((w) => {
					this.engine.layerManager.layers
						.filter((l) => l instanceof FloatingWindowLayer)
						.forEach((l) => {
							l.moveToTop();
						});
				});

				// and keep the resizer ontop of that as well
				this.floatingWindows.forEach((w) => {
					this.engine.layerManager.layers
						.filter((l) => l instanceof FloatingWindowResizeLayer)
						.forEach((l) => {
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
		const resize = new FloatingWindowResizeLayer(window);
		this.engine.layerManager.addLayer(layer);
		this.engine.layerManager.addLayer(resize);
		window.setParent(this);
		window.registerListener({
			removed: () => {
				layer.remove();
				resize.remove();
				this.floatingWindows.delete(window);
			}
		});
	}
}
