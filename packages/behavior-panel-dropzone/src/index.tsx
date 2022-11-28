import * as React from 'react';
import {
  Alignment,
  WorkspaceCollectionModel,
  WorkspaceEngine,
  WorkspaceModel,
  WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from './DropZoneLayer';
import { DropZonePanelDirective, TransformZone } from './DropZoneLayerPanelWidget';
import { DropZoneLayerButtonWidget } from './DropZoneLayerButtonWidget';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

library.add(faCopy);

export interface DraggingItemBehaviorOptions {
  getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
  engine: WorkspaceEngine;
  debug?: boolean;
}

export const draggingItemBehavior = (options: DraggingItemBehaviorOptions) => {
  let layer: DropZoneLayer = null;
  const { engine } = options;
  engine.registerListener({
    modelDragStart: () => {
      if (layer) {
        return;
      }
      layer = new DropZoneLayer({
        modelID: engine.draggingID,
        getDropZoneForModel: options.getDropZoneForModel,
        debugModels: options.debug
      });
      engine.layerManager.addLayer(layer);
    },
    modelDragEnd: () => {
      layer?.remove();
      layer = null;
    }
  });
};

export const ReplaceZone: TransformZone = {
  key: 'REPLACE',
  render: ({ entered }) => {
    return <DropZoneLayerButtonWidget entered={entered} text="Replace" icon="copy" />;
  },
  transform: ({ model, zoneModel, engine }) => {
    (zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, model);
    engine.normalize();
  }
};

export const getDirectiveForWorkspaceNode = (
  node: WorkspaceModel,
  transformZones: TransformZone[]
): DropZonePanelDirective | null => {
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceNodeModel) {
    return {
      transformZones: transformZones,
      splitZones: [
        {
          alignment: node.parent.vertical ? Alignment.LEFT : Alignment.TOP,
          handleDrop: (model) => {
            const parent = node.parent as WorkspaceNodeModel;
            const m = new WorkspaceNodeModel();
            m.setVertical(!parent.vertical);
            m.setExpand(model.expandHorizontal, model.expandHorizontal);
            m.addModel(model);
            parent.replaceModel(node, m);
            m.addModel(node);
          }
        },
        {
          alignment: node.parent.vertical ? Alignment.RIGHT : Alignment.BOTTOM,
          handleDrop: (model) => {
            const parent = node.parent as WorkspaceNodeModel;
            const m = new WorkspaceNodeModel();
            m.setVertical(!parent.vertical);
            m.setExpand(model.expandHorizontal, model.expandHorizontal);
            m.addModel(model);
            parent.replaceModel(node, m);
            m.addModel(node, 0);
          }
        }
      ]
    };
  }
};

export * from './DropZoneLayerPanelWidget';
export * from './DropZoneLayerButtonWidget';
export * from './DropZoneTransformWidget';
export * from './DropZoneAlignmentButtonWidget';
export * from './DropZoneLayer';
