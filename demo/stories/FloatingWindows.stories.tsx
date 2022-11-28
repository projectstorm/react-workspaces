import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { DefaultWindowModel, DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';
import { CompInternal, DebugOptions, genVerticalNode, useEngine, useRootModel } from './helpers/tools';

export const FloatingWindows = function (args) {
  const engine = useEngine(args);
  const [model] = useState(() => {
    let model = new RootWorkspaceModel(engine, false);
    model.setHorizontal(true);
    model

      //left panel
      .addModel(genVerticalNode())

      //tab panel
      .addModel(
        new WorkspaceTabModel()

          .addModel( new DefaultWorkspacePanelModel('Tab 4'))
          .addModel(new DefaultWorkspacePanelModel('Tab 5'))
          .addModel(new DefaultWorkspacePanelModel('Tab 6'))
      )

      .addModel(genVerticalNode());

    const window1 = new DefaultWindowModel(new DefaultWorkspacePanelModel('Floating window 1'));
    window1.position.update({
      top: 100,
      left: 100
    });
    window1.setWidth(400);
    window1.setHeight(400);
    model.addFloatingWindow(window1);

    const window2 = new DefaultWindowModel(new DefaultWorkspacePanelModel('Floating window 2'));
    window2.position.update({
      top: 100,
      left: 600
    });
    window2.setWidth(400);
    window2.setHeight(400);
    model.addFloatingWindow(window2);

    return model;
  });
  useRootModel(model, args);

  return <CompInternal model={model} engine={engine} />;
}.bind({});

FloatingWindows.args = {
  [DebugOptions.DebugPanels]: false,
  [DebugOptions.DebugDividers]: false,
  [DebugOptions.DebugResizers]: false,
  [DebugOptions.DebugWindows]: false
};

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
