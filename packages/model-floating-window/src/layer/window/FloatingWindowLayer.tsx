import { Layer, RenderLayerEvent } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { FloatingWindowLayerWidget } from './FloatingWindowLayerWidget';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';

export class FloatingWindowLayer extends Layer {
  private animate: boolean;

  constructor(protected model: FloatingWindowModel) {
    super({
      mouseEvents: false
    });
    this.animate = true;
  }

  setAnimate(animate: boolean) {
    this.animate = animate;
    this.repaint();
  }

  renderLayer(event: RenderLayerEvent): JSX.Element {
    return <FloatingWindowLayerWidget layer={this} animate={this.animate} window={this.model} engine={event.engine} />;
  }
}
