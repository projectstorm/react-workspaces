import { Layer, RenderLayerEvent, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeLayerWidget } from './FloatingWindowResizeLayerWidget';

export interface FloatingWindowLayerOptions {
	model: WorkspaceModel;
}

export class FloatingWindowResizeLayer extends Layer {
	constructor(protected model: FloatingWindowModel) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event: RenderLayerEvent): JSX.Element {
		return <FloatingWindowResizeLayerWidget window={this.model} />;
	}
}
