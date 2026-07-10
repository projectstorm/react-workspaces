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
import { WorkspaceTrayFactory, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTableList } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTableList);

export const AppendToTrayZone: TransformZone = {
  key: 'ADD_ITEM',
  render: ({ entered, theme }) => {
    return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Add to tray" icon="plus" />;
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
      return <DropZoneLayerButtonWidget theme={theme} entered={entered} text="Add to tray" icon="table-list" />;
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
  transformZones: TransformZone[] = [],
  generateParentNode: () => WorkspaceNodeModel = () => new WorkspaceNodeModel(),
  allowSplit: boolean = true
): DropZonePanelDirective | null => {
  if (!(node instanceof WorkspaceCollectionModel) && node.parent instanceof WorkspaceTrayModel) {
    const tray = node.parent;
    const parent = tray.parent;
    const splitZones =
      allowSplit && parent instanceof WorkspaceNodeModel && parent === tray.getRootModel()
        ? [Alignment.TOP, Alignment.BOTTOM].map((alignment) => ({
            alignment,
            handleDrop: (model: WorkspaceModel, engine) => {
              const split = generateParentNode()
                .setVertical(true)
                .setExpand(tray.expandHorizontal, tray.expandVertical);
              parent.replaceModel(tray, split);
              split.addModel(tray);
              split.addModel(model, alignment === Alignment.TOP ? 0 : null);
              engine.normalize();
            }
          }))
        : [];

    return {
      transformZones: [AppendToTrayZone, ...transformZones],
      splitZones
    };
  }
};
