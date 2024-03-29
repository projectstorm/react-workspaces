import * as React from 'react';
import {
  Alignment,
  WorkspaceCollectionModel,
  WorkspaceEngine,
  WorkspaceModel,
  WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';
import { DropZoneLayer } from './DropZoneLayer';
import { DropZoneLayerPanelTheme, DropZonePanelDirective, TransformZone } from './DropZoneLayerPanelWidget';
import { DropZoneLayerButtonWidget } from './DropZoneLayerButtonWidget';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

library.add(faCopy);

export interface DraggingItemBehaviorOptions {
  getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
  engine: WorkspaceEngine;
  debug?: boolean;
  getTheme?: () => DropZoneLayerPanelTheme;
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
        debugModels: options.debug,
        theme: options.getTheme?.()
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
  render: ({ entered, theme }) => {
    return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Replace" icon="copy" />;
  },
  transform: ({ model, zoneModel, engine }) => {
    (zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, model);
    engine.normalize();
  }
};

export interface GetDirectiveForWorkspaceNodeOptions {
  node: WorkspaceModel;
  transformZones?: TransformZone[];
  generateParentNode?: () => WorkspaceNodeModel;
}

export const getDirectiveForWorkspaceNode = (
  options: GetDirectiveForWorkspaceNodeOptions
): DropZonePanelDirective | null => {
  const { node, transformZones, generateParentNode } = options;
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceNodeModel) {
    return {
      transformZones: [ReplaceZone, ...(transformZones || [])],
      splitZones: [
        {
          alignment: node.parent.vertical ? Alignment.LEFT : Alignment.TOP,
          handleDrop: (model, engine) => {
            const parent = node.parent as WorkspaceNodeModel;
            const m = generateParentNode?.() || new WorkspaceNodeModel();
            m.setVertical(!parent.vertical);
            m.setExpand(model.expandHorizontal, model.expandHorizontal);
            m.addModel(model);
            parent.replaceModel(node, m);
            m.addModel(node);
            engine.normalize();
          }
        },
        {
          alignment: node.parent.vertical ? Alignment.RIGHT : Alignment.BOTTOM,
          handleDrop: (model, engine) => {
            const parent = node.parent as WorkspaceNodeModel;
            const m = generateParentNode?.() || new WorkspaceNodeModel();
            m.setVertical(!parent.vertical);
            m.setExpand(model.expandHorizontal, model.expandHorizontal);
            m.addModel(model);
            parent.replaceModel(node, m);
            m.addModel(node, 0);
            engine.normalize();
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
