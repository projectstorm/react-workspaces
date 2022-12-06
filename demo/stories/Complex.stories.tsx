import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { CompInternal, SharedArgs, useEngine, useRootModel } from './helpers/tools';
import { createComplexModel } from './helpers/complexModel';

export const createComplexLayout = () => {};

export const ComplexLayout = function (args) {
  const engine = useEngine(args);
  const [model] = useState(() => {
    return createComplexModel(engine);
  });
  useRootModel(model, args);
  return <CompInternal model={model} engine={engine} />;
}.bind({});

ComplexLayout.args = SharedArgs;

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
