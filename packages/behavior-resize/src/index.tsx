import { ResizeDividersLayer } from './ResizeDividersLayer';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';

export * from './ResizeDividerWidget';
export * from './ResizeDividersLayer';

export const resizingBehavior = (engine: WorkspaceEngine) => {
  const layer = new ResizeDividersLayer();

  const tryMountLayer = () => {
    if (engine.rootModel && !layer.isInserted()) {
      engine.layerManager.addLayer(layer);
    } else if (!engine.rootModel && layer.isInserted()) {
      layer.remove();
    }
  };

  tryMountLayer();
  engine.registerListener({
    modelUpdated: () => {
      tryMountLayer();
    },
    modelDragStart: () => {
      layer.remove();
    },
    modelDragEnd: () => {
      engine.layerManager.addLayer(layer);
    }
  });
};
