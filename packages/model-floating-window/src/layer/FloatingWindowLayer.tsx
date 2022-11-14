import { Layer, RenderLayerEvent, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowLayerWidget } from './FloatingWindowLayerWidget';
import { FloatingWindowModel } from '../core/FloatingWindowModel';

export interface FloatingWindowLayerOptions {
	model: WorkspaceModel;
}

export class FloatingWindowLayer extends Layer {
	constructor(protected model: FloatingWindowModel) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event: RenderLayerEvent): JSX.Element {
		return <FloatingWindowLayerWidget window={this.model} engine={event.engine} />;
	}
}
