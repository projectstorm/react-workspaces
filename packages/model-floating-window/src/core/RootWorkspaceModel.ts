import { ExpandNodeModel, WorkspaceEngine, WorkspaceNodeModelSerialized } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel, SerializedFloatingWindowModel } from './FloatingWindowModel';
import { FloatingWindowLayer } from '../layer/window/FloatingWindowLayer';
import { FloatingWindowResizeLayer } from '../layer/resize/FloatingWindowResizeLayer';

export interface SerializedRootWorkspaceModel extends WorkspaceNodeModelSerialized {
  floatingWindows: SerializedFloatingWindowModel[];
}

export class RootWorkspaceModel extends ExpandNodeModel<SerializedRootWorkspaceModel> {
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

  toArray(): SerializedRootWorkspaceModel {
    return {
      ...super.toArray(),
      floatingWindows: Array.from(this.floatingWindows.values())
        .filter((w) => w.serializeToRoot)
        .map((c) => c.toArray())
    };
  }

  fromArray(payload: SerializedRootWorkspaceModel, engine: WorkspaceEngine) {
    super.fromArray(payload, engine);
    payload.floatingWindows.forEach((window) => {
      const model = engine.getFactory(window.type).generateModel();
      model.fromArray(window, engine);
      this.addModel(model);
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
