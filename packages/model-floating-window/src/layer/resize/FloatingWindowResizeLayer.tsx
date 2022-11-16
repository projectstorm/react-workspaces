import { Layer, RenderLayerEvent, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeLayerWidget } from './FloatingWindowResizeLayerWidget';

export interface FloatingWindowResizeLayerOptions {
	model: FloatingWindowModel;
	debug: boolean;
	toggleAnimation: (animate: boolean) => any;
}

export class FloatingWindowResizeLayer extends Layer {
	constructor(protected options2: FloatingWindowResizeLayerOptions) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event: RenderLayerEvent): JSX.Element {
		return (
			<FloatingWindowResizeLayerWidget
				debug={this.options2.debug}
				window={this.options2.model}
				toggleAnimation={this.options2.toggleAnimation}
			/>
		);
	}
}
