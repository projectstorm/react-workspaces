import { BaseListener, BaseObserver } from '../../core/BaseObserver';
import { v4 } from 'uuid';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export interface LayerListener extends BaseListener {
	removed: () => any;
}

export interface RenderLayerEvent {
	engine: WorkspaceEngine;
	model: WorkspaceModel;
}

export interface LayerOptions {
	mouseEvents: boolean;
}

export abstract class Layer extends BaseObserver<LayerListener> {
	id: string;

	constructor(public options: LayerOptions) {
		super();
		this.id = v4();
	}

	abstract renderLayer(event: RenderLayerEvent): JSX.Element;

	remove() {
		this.iterateListeners((cb) => cb.removed?.());
	}
}

export interface LayerManagerListener extends BaseListener {
	layersChanged: () => any;
}

export class LayerManager extends BaseObserver<LayerManagerListener> {
	private _layers: Set<Layer>;

	constructor() {
		super();
		this._layers = new Set();
	}

	get layers() {
		return Array.from(this._layers.values());
	}

	addLayer(layer: Layer) {
		this._layers.add(layer);
		const l = layer.registerListener({
			removed: () => {
				this._layers.delete(layer);
				l();
			}
		});
		this.iterateListeners((cb) => cb.layersChanged?.());
	}
}
