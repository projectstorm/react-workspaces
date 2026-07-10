import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { CompInternal, SharedArgs, StoryArgs, useEngine } from './helpers/tools';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';

export const AffinityStories = Object.assign(
  function AffinityStories(args: StoryArgs) {
    const engine = useEngine(args);
    const [model] = useState(() => {
      let model = new WorkspaceNodeModel();
      model.setHorizontal(true);
      model
        .addModel(new DefaultWorkspacePanelModel('left'))
        .addModel(new DefaultWorkspacePanelModel('left'))
        .addModel(new DefaultWorkspacePanelModel('left'))
        .addModel(new DefaultWorkspacePanelModel('expand').setExpand(true, true))
        .addModel(new DefaultWorkspacePanelModel('right'))
        .addModel(new DefaultWorkspacePanelModel('right'))
        .addModel(new DefaultWorkspacePanelModel('right'));
      return model;
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
