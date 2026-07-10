import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { ExpandNodeModel } from '@projectstorm/react-workspaces-core';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { CompInternal, SharedArgs, StoryArgs, useEngine } from './helpers/tools';

export const RootTabSplit = Object.assign(
  function RootTabSplit(args: StoryArgs) {
    const engine = useEngine(args);
    const [model] = useState(() => {
      const tabs = new WorkspaceTabModel();
      tabs.addModel(new DefaultWorkspacePanelModel('Tab 1'));
      tabs.addModel(new DefaultWorkspacePanelModel('Tab 2'));

      return new ExpandNodeModel()
        .setHorizontal(true)
        .addModel(new DefaultWorkspacePanelModel('Left panel'))
        .addModel(tabs);
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
