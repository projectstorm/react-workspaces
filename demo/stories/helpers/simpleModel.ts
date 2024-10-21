import { ExpandNodeModel } from '@projectstorm/react-workspaces-core';
import { genVerticalNode } from './tools';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';

export const createSimpleModel = () => {
  let model = new ExpandNodeModel();
  model
    .setHorizontal(true)
    //
    //left panel
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode());
  return model;
};
