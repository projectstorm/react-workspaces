import { Layer, RenderLayerEvent } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeLayerWidget } from './FloatingWindowResizeLayerWidget';
import { RootWorkspaceModel } from '../../core/RootWorkspaceModel';

export interface FloatingWindowResizeLayerOptions {
  model: FloatingWindowModel;
  toggleAnimation: (animate: boolean) => any;
  root: RootWorkspaceModel;
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
        debug={this.options2.root.debug}
        window={this.options2.model}
        toggleAnimation={this.options2.toggleAnimation}
      />
    );
  }
}
