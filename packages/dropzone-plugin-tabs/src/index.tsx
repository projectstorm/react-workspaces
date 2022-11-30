import * as React from 'react';
import { WorkspaceCollectionModel, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import {
  DropZoneLayerButtonWidget,
  DropZonePanelDirective,
  ReplaceZone,
  TransformZone
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { WorkspaceTabFactory, WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faLayerGroup);

export const AppendToTabGroupZone: TransformZone = {
  key: 'ADD_TAB',
  render: ({ entered }) => {
    return <DropZoneLayerButtonWidget entered={entered} text="Add Tab" icon="plus" />;
  },
  transform: ({ model, zoneModel, engine }) => {
    (zoneModel.parent as WorkspaceTabModel).addModel(model);
    engine.normalize();
  }
};

export const ConvertToTabZone = (factory: WorkspaceTabFactory): TransformZone => {
  return {
    key: 'MAKE_TABS',
    render: ({ entered }) => {
      return <DropZoneLayerButtonWidget entered={entered} text="Tabs" icon="layer-group" />;
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
  transformZones: TransformZone[] = []
): DropZonePanelDirective | null => {
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTabModel) {
    return {
      transformZones: [ReplaceZone, AppendToTabGroupZone, ...transformZones],
      splitZones: []
    };
  }
};
