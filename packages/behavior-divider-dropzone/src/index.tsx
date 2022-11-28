import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { DropzoneDividersLayer } from './DropzoneDividersLayer';

export const draggingItemDividerBehavior = (engine: WorkspaceEngine) => {
  let layer: DropzoneDividersLayer = null;
  engine.registerListener({
    modelDragStart: () => {
      if (layer) {
        return;
      }
      layer = new DropzoneDividersLayer(engine.draggingID);
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
