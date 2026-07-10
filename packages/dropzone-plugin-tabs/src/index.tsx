import * as React from 'react';
import {
  Alignment,
  WorkspaceCollectionModel,
  WorkspaceModel,
  WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';
import {
  DropZoneLayerButtonWidget,
  DropZonePanelDirective,
  TransformZone
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { WorkspaceTabFactory, WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faLayerGroup);

export const AppendToTabGroupZone: TransformZone = {
  key: 'ADD_TAB',
  render: ({ entered, theme }) => {
    return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Add tab" icon="plus" />;
  },
  transform: ({ model, zoneModel, engine }) => {
    (zoneModel.parent as WorkspaceTabModel).addModel(model);
    engine.normalize();
  }
};

export const ConvertToTabZone = (factory: WorkspaceTabFactory): TransformZone => {
  return {
    key: 'MAKE_TABS',
    render: ({ entered, theme }) => {
      return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Add as tabs" icon="layer-group" />;
    },
    transform: ({ model, zoneModel, engine }) => {
      const tabs = factory.generateModel();
      (zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, tabs);
      tabs.addModel(zoneModel);
      tabs.addModel(model);
      engine.normalize();
    }
  };
};

export const getDirectiveForTabModel = (
  node: WorkspaceModel,
  transformZones: TransformZone[] = [],
  generateParentNode: () => WorkspaceNodeModel = () => new WorkspaceNodeModel()
): DropZonePanelDirective | null => {
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTabModel) {
    const tabs = node.parent;
    const parent = tabs.parent;
    const splitZones =
      parent instanceof WorkspaceNodeModel && parent === tabs.getRootModel()
        ? [Alignment.TOP, Alignment.BOTTOM].map((alignment) => ({
            alignment,
            handleDrop: (model: WorkspaceModel, engine) => {
              const split = generateParentNode()
                .setVertical(true)
                .setExpand(tabs.expandHorizontal, tabs.expandVertical);
              parent.replaceModel(tabs, split);
              split.addModel(tabs);
              split.addModel(model, alignment === Alignment.TOP ? 0 : null);
              engine.normalize();
            }
          }))
        : [];

    return {
      transformZones: [AppendToTabGroupZone, ...transformZones],
      splitZones
    };
  }
};
