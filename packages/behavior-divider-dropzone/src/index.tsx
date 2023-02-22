import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { DropzoneDividersLayer } from './DropzoneDividersLayer';
import { DropzoneDividerTheme } from './DropzoneDividerWidget';

export interface DraggingItemDividerBehaviorOptions {
  engine: WorkspaceEngine;
  theme?: () => DropzoneDividerTheme;
}

export const draggingItemDividerBehavior = (options: DraggingItemDividerBehaviorOptions) => {
  let layer: DropzoneDividersLayer = null;
  const { engine, theme } = options;
  engine.registerListener({
    modelDragStart: () => {
      if (layer) {
        return;
      }
      layer = new DropzoneDividersLayer({
        theme: theme
      });
      engine.layerManager.addLayer(layer);
    },
    modelDragEnd: () => {
      layer?.remove();
      layer = null;
    }
  });
};

export * from './DropzoneDividerWidget';
export * from './DropzoneDividersLayer';
