import { ExpandNodeModel, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from './FloatingWindowModel';
import { FloatingWindowLayer } from '../layer/window/FloatingWindowLayer';
import { FloatingWindowResizeLayer } from '../layer/resize/FloatingWindowResizeLayer';

export class RootWorkspaceModel extends ExpandNodeModel {
	floatingWindows: Set<FloatingWindowModel>;
	layerListener: () => any;

	constructor(public engine: WorkspaceEngine, public debug: boolean = false) {
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

	setDebug(debug: boolean) {
		this.debug = debug;
		this.engine.fireRepaintListeners();
	}

	flatten() {
		return super.flatten().concat(Array.from(this.floatingWindows.values()).flatMap((v) => [v, v.child]));
	}

	dispose() {
		this.layerListener();
	}

	addFloatingWindow(window: FloatingWindowModel) {
		if (this.floatingWindows.has(window)) {
			return;
		}
		this.floatingWindows.add(window);
		const layer = new FloatingWindowLayer(window);
		const resize = new FloatingWindowResizeLayer({
			model: window,
			toggleAnimation: (animate) => {
				layer.setAnimate(animate);
			},
			root: this
		});
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
