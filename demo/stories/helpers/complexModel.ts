import { genVerticalNode } from './tools';
import { RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';
import { DefaultWindowModelFactory, DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTrayMode, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';

export const createComplexModel = (engine: WorkspaceEngine) => {
  let model = new RootWorkspaceModel(engine);
  model.setHorizontal(true);

  const windowFactory = new DefaultWindowModelFactory();

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

  const expandNode = genVerticalNode();
  expandNode.setExpand(true, true);

  model

    //left panel
    .addModel(
      new WorkspaceTrayModel({
        iconWidth: 50,
        expandedWidth: 250,
        factory: windowFactory
      })
        .setMode(WorkspaceTrayMode.COLLAPSED)
        .setExpand(false, true)
        .addModel(new DefaultWorkspacePanelModel('Tray panel 1'))
        .addModel(new DefaultWorkspacePanelModel('Tray panel 2'))
        .addModel(new DefaultWorkspacePanelModel('Tray panel 3'))
    )
    .addModel(genVerticalNode())
    .addModel(genVerticalNode())

    //tab panel
    .addModel(
      new WorkspaceTabModel()
        .addModel(new DefaultWorkspacePanelModel('Tab 1'))
        .addModel(new DefaultWorkspacePanelModel('Tab 2'))
        .addModel(new DefaultWorkspacePanelModel('Tab 3'))
    )
    .addModel(expandNode)

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
};
