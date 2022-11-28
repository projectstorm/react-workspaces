import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { DefaultWindowModelFactory, DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { CompInternal, DebugOptions, genVerticalNode, useEngine, useRootModel } from './helpers/tools';
import { WorkspaceTrayMode, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';

export const ComplexLayout = function (args) {
  const engine = useEngine(args);
  const [model] = useState(() => {
    let model = new RootWorkspaceModel(engine);
    const windowFactory = new DefaultWindowModelFactory();
    model.setHorizontal(true);

    const largeTray = new WorkspaceTrayModel({
      iconWidth: 50,
      expandedWidth: 250,
      factory: windowFactory
    })
      .setMode(WorkspaceTrayMode.COLLAPSED)
      .setExpand(false, true);
    for (let i = 0; i < 20; i++) {
      largeTray.addModel(new DefaultWorkspacePanelModel('Tray panel ' + i));
    }

    const expandTray = genVerticalNode();
    expandTray.setExpand(true, true);

    model

      //left panel
      .addModel(genVerticalNode())
      .addModel(genVerticalNode())

      //tab panel
      .addModel(
        new WorkspaceTabModel()
          .addModel(new DefaultWorkspacePanelModel('Tab 1'))
          .addModel(new DefaultWorkspacePanelModel('Tab 2'))
          .addModel(new DefaultWorkspacePanelModel('Tab 3'))
      )
      .addModel(expandTray)

      .addModel(largeTray)
      .addModel(
        new WorkspaceTrayModel({
          iconWidth: 50,
          expandedWidth: 250,
          factory: windowFactory
        })
          .setMode(WorkspaceTrayMode.NORMAL)
          .setExpand(false, true)
          .addModel(new DefaultWorkspacePanelModel('Tray panel 1'))
          .addModel(new DefaultWorkspacePanelModel('Tray panel 2'))
          .addModel(new DefaultWorkspacePanelModel('Tray panel 3'))
      )
      .addModel(genVerticalNode());
    return model;
  });
  useRootModel(model, args);
  return <CompInternal model={model} engine={engine} />;
}.bind({});

ComplexLayout.args = {
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
