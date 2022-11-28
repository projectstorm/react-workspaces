import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { CompInternal, DebugOptions, genVerticalNode, useEngine } from './helpers/tools';

export const MinMax = function (args) {
  const engine = useEngine(args);
  const [model] = useState(() => {
    let model = new WorkspaceNodeModel();
    model.setHorizontal(true);

    const genNode2 = () => {
      const node = genVerticalNode();
      node.minimumSize.update({
        width: 50
      });
      node.maximumSize.update({
        width: 250
      });
      return node;
    };

    model

      //left panel
      .addModel(genNode2())

      //tab panel
      .addModel(
        new WorkspaceTabModel()
          .addModel(new DefaultWorkspacePanelModel('Tab 1'))
          .addModel(new DefaultWorkspacePanelModel('Tab 2'))
          .addModel(new DefaultWorkspacePanelModel('Tab 3'))
      )

      //tab panel
      .addModel(
        new WorkspaceTabModel()
          .addModel(new DefaultWorkspacePanelModel('Tab 4'))
          .addModel(new DefaultWorkspacePanelModel('Tab 5'))
          .addModel(new DefaultWorkspacePanelModel('Tab 6'))
      )

      .addModel(genNode2());
    return model;
  });
  return <CompInternal model={model} engine={engine} />;
}.bind(this);

MinMax.args = {
  [DebugOptions.DebugPanels]: false,
  [DebugOptions.DebugDividers]: false,
  [DebugOptions.DebugResizers]: false
};

export default {
  title: 'Workspace',
  parameters: {
    layout: 'fullscreen'
  }
};
