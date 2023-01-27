import * as React from 'react';
import { useEffect, useState } from 'react';
import 'typeface-open-sans';
import { Buttons, CompInternal, SharedArgs, useEngine, useRootModel } from './helpers/tools';
import { createComplexModel } from './helpers/complexModel';
import { useForceUpdate } from '@projectstorm/react-workspaces-core';

export const ComplexLayout = function (args) {
  const forceUpdate = useForceUpdate();
  const engine = useEngine(args);
  const [model] = useState(() => {
    return createComplexModel(engine);
  });
  useEffect(() => {
    return engine.registerListener({
      lockUpdated: () => {
        forceUpdate();
      }
    });
  }, []);
  useRootModel(model, args);
  return (
    <Buttons
      btns={{
        [engine.locked ? 'Unlock' : 'Lock']: () => {
          engine.setLocked(!engine.locked);
        }
      }}
    >
      <CompInternal model={model} engine={engine} />
    </Buttons>
  );
}.bind({});

ComplexLayout.args = SharedArgs;

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
