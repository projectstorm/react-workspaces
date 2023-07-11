import { BaseListener, BaseObserver } from '../../core/BaseObserver';
import { v4 } from 'uuid';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export interface LayerListener extends BaseListener {
  removed: () => any;
  moveToTop: () => any;
  repaint: () => any;
}

export interface RenderLayerEvent {
  engine: WorkspaceEngine;
  model: WorkspaceModel;
}

export interface LayerOptions {
  mouseEvents: boolean;
}

export abstract class Layer<T extends LayerListener = LayerListener> extends BaseObserver<T> {
  id: string;
  layerManager: LayerManager;

  constructor(public options: LayerOptions) {
    super();
    this.id = v4();
    this.layerManager = null;
  }

  abstract renderLayer(event: RenderLayerEvent): JSX.Element;

  setLayerManager(manager: LayerManager) {
    this.layerManager = manager;
  }

  isInserted() {
    return !!this.layerManager;
  }

  remove() {
    this.iterateListeners((cb) => cb.removed?.());
  }

  moveToTop() {
    this.iterateListeners((cb) => cb.moveToTop?.());
  }

  repaint() {
    this.iterateListeners((cb) => cb.repaint?.());
  }
}

export interface LayerManagerListener extends BaseListener {
  layersChanged: () => any;
  layerAdded: () => any;
}

export class LayerManager extends BaseObserver<LayerManagerListener> {
  private _layers: Set<Layer>;

  initialZIndex: number;

  constructor() {
    super();
    this._layers = new Set();
    this.initialZIndex = 1;
  }

  setInitialZIndex(index: number) {
    if (index < 1) {
      throw new Error('Index must be > 0');
    }
    this.initialZIndex = index;
    this.fireUpdated();
  }

  get layers() {
    return Array.from(this._layers.values());
  }

  fireUpdated() {
    this.iterateListeners((cb) => cb.layersChanged?.());
  }

  addLayer(layer: Layer) {
    layer.setLayerManager(this);
    this._layers.add(layer);
    const l = layer.registerListener({
      removed: () => {
        this._layers.delete(layer);
        layer.setLayerManager(null);
        l();
        this.fireUpdated();
      },
      moveToTop: () => {
        // remove from current position
        this._layers.delete(layer);

        // add to the top
        this._layers.add(layer);
        this.fireUpdated();
      }
    });
    this.iterateListeners((cb) => cb.layerAdded?.());
    this.fireUpdated();
  }
}
