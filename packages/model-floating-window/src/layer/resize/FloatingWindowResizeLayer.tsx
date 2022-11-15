import { Layer, RenderLayerEvent, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeLayerWidget } from './FloatingWindowResizeLayerWidget';

export class FloatingWindowResizeLayer extends Layer {
	constructor(protected model: FloatingWindowModel, protected debug: boolean = false) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event: RenderLayerEvent): JSX.Element {
		return <FloatingWindowResizeLayerWidget debug={this.debug} window={this.model} />;
	}
}
