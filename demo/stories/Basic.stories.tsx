import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { ExpandNodeModel } from '@projectstorm/react-workspaces-core';
import { CompInternal, DebugOptions, genVerticalNode, SharedArgs, useEngine } from './helpers/tools';

export const Basic = function (args) {
  const engine = useEngine(args);
  const [model] = useState(() => {
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
  });
  return <CompInternal model={model} engine={engine} />;
}.bind({});

Basic.args = SharedArgs;

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
