import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { CompInternal, SharedArgs, StoryArgs, useEngine } from './helpers/tools';
import { createSimpleModel } from './helpers/simpleModel';

export const Basic = Object.assign(
  function Basic(args: StoryArgs) {
    const engine = useEngine(args);
    const [model] = useState(() => {
      return createSimpleModel();
    });
    return <CompInternal model={model} engine={engine} />;
  },
  { args: SharedArgs }
);

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
