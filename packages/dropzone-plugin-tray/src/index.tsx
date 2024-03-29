import * as React from 'react';
import { WorkspaceCollectionModel, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import {
  DropZoneLayerButtonWidget,
  DropZonePanelDirective,
  ReplaceZone,
  TransformZone
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { WorkspaceTrayFactory, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTableList } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTableList);

export const AppendToTrayZone: TransformZone = {
  key: 'ADD_ITEM',
  render: ({ entered, theme }) => {
    return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Add item" icon="plus" />;
  },
  transform: ({ model, zoneModel, engine }) => {
    (zoneModel.parent as WorkspaceTrayModel).addModel(model);
    engine.normalize();
  }
};

export const ConvertToTrayZone = (trayFactory: WorkspaceTrayFactory): TransformZone => {
  return {
    key: 'MAKE_TRAY',
    render: ({ entered, theme }) => {
      return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Tray" icon="table-list" />;
    },
    transform: ({ model, zoneModel, engine }) => {
      const trayModel = trayFactory.generateModel();
      (zoneModel.parent as WorkspaceCollectionModel).replaceModel(zoneModel, trayModel);
      trayModel.addModel(zoneModel);
      trayModel.addModel(model);
      engine.normalize();
    }
  };
};

export const getDirectiveForTrayModel = (
  node: WorkspaceModel,
  transformZones: TransformZone[] = []
): DropZonePanelDirective | null => {
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTrayModel) {
    return {
      transformZones: [ReplaceZone, AppendToTrayZone, ...transformZones],
      splitZones: []
    };
  }
};
