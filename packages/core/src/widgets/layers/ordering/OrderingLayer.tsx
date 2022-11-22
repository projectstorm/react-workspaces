import * as React from 'react';
import { Layer, LayerListener, RenderLayerEvent } from '../LayerManager';
import { DimensionContainer } from '../../../core/dimensions/DimensionContainer';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { OrderingLayerWidget } from './OrderingLayerWidget';

export interface OrderingLayerListener extends LayerListener {
	enteredZone: (zone: number | null) => any;
	dropped: (model: WorkspaceModel, index: number) => any;
}

export interface OrderingLayerOptions {
	trackers: DimensionContainer[];
}

export class OrderingLayer extends Layer<OrderingLayerListener> {
	constructor(protected options2: OrderingLayerOptions) {
		super({
			mouseEvents: false
		});
	}

	get trackers() {
		return this.options2.trackers;
	}

	zoneEntered(number: number | null) {
		this.iterateListeners((cb) => cb.enteredZone?.(number));
	}

	dropped(model: WorkspaceModel, index: number) {
		this.iterateListeners((cb) => cb.dropped?.(model, index));
	}

	renderLayer(event: RenderLayerEvent): JSX.Element {
		return <OrderingLayerWidget layer={this} />;
	}
}
