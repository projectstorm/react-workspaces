import { genVerticalNode } from './tools';
import { RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTrayFactory, WorkspaceTrayMode, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';

export const createComplexModel = (engine: WorkspaceEngine) => {
  let model = new RootWorkspaceModel(engine);
  model.registerListener({
    overConstrainedChanged: () => {
      console.log(`overconstrained: ${model.r_overConstrained ? 'true' : 'false'}`);

      // when we overconstrained, we can use the directive below to cause the children layouts on the root model
      // to be recomputed (this method exists on all ExpandNodeModels )
      if (model.r_overConstrained) {
        // model.recomputeInitialSizes();
      }
    }
  });
  model.setHorizontal(true);

  const trayFactory = engine.getFactory<WorkspaceTrayFactory>(WorkspaceTrayModel.NAME);

  const largeTray = trayFactory.generateModel().setMode(WorkspaceTrayMode.COLLAPSED).setExpand(false, true);
  for (let i = 0; i < 20; i++) {
    largeTray.addModel(new DefaultWorkspacePanelModel('Tray panel ' + i));
  }

  const expandNode = genVerticalNode();
  expandNode.setExpand(true, true);

  model

    //left panel
    .addModel(
      trayFactory
        .generateModel()
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
      trayFactory
        .generateModel()
        .setMode(WorkspaceTrayMode.NORMAL)
        .setExpand(false, true)
        .addModel(new DefaultWorkspacePanelModel('Tray panel 1'))
        .addModel(new DefaultWorkspacePanelModel('Tray panel 2'))
        .addModel(new DefaultWorkspacePanelModel('Tray panel 3'))
    )
    .addModel(genVerticalNode());
  return model;
};
