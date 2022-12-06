import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { Buttons, CompInternal, SharedArgs, useEngine } from './helpers/tools';
import { createSimpleModel } from './helpers/simpleModel';
import { createComplexModel } from './helpers/complexModel';

export const SwitchModels = function (args) {
  const engine = useEngine(args);
  const [model1] = useState(() => {
    return createSimpleModel();
  });
  const [model2] = useState(() => {
    return createComplexModel(engine);
  });

  const [selected, setSelected] = useState(model1);

  return (
    <Buttons
      btns={{
        'Toggle Between models': () => {
          if (selected === model1) {
            setSelected(model2);
          } else {
            setSelected(model1);
          }
        }
      }}
    >
      <CompInternal model={selected} engine={engine} />
    </Buttons>
  );
}.bind({});

SwitchModels.args = SharedArgs;

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
