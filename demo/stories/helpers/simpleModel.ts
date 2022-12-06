import { ExpandNodeModel } from '@projectstorm/react-workspaces-core';
import { genVerticalNode } from './tools';

export const createSimpleModel = () => {
  let model = new ExpandNodeModel();
  model.setHorizontal(true);
  model

    //left panel
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())
    .addModel(genVerticalNode());
  return model;
};
