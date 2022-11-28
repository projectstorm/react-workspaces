import * as React from 'react';
import { TabRenderer, TabRendererEvent } from '@projectstorm/react-workspaces-model-tabs';
import { RenderTitleBarEvent, WorkspaceNodePanelRenderer } from '@projectstorm/react-workspaces-core';
import { DefaultPanelTitleWidget } from './widgets/DefaultPanelTitleWidget';
import { DefaultWorkspacePanelModel } from './panel/DefaultWorkspacePanelModel';
import { DefaultPanelTabWidget } from './widgets/DefaultPanelTabWidget';
import { DefaultWorkspacePanelFactory } from './panel/DefaultWorkspacePanelFactory';
import {
  TrayModelPanelRenderer,
  TrayModelPanelRendererEvent,
  WorkspaceTrayMode
} from '@projectstorm/react-workspaces-model-tray';
import { DefaultPanelMicroButtonWidget } from './widgets/DefaultPanelMicroButtonWidget';

export class DefaultSubComponentRenderer
  implements
    TabRenderer<DefaultWorkspacePanelModel>,
    WorkspaceNodePanelRenderer<DefaultWorkspacePanelModel>,
    TrayModelPanelRenderer<DefaultWorkspacePanelModel>
{
  renderIcon(event: TrayModelPanelRendererEvent<DefaultWorkspacePanelModel>): JSX.Element {
    return (
      <DefaultPanelMicroButtonWidget
        smaller={event.parent.mode === WorkspaceTrayMode.NORMAL}
        selected={event.selected}
        icon={event.model.icon}
      />
    );
  }

  renderTitleBar(model: RenderTitleBarEvent<DefaultWorkspacePanelModel>): JSX.Element {
    return <DefaultPanelTitleWidget title={model.model.displayName} />;
  }

  renderTab(event: TabRendererEvent<DefaultWorkspacePanelModel>): JSX.Element {
    return <DefaultPanelTabWidget name={event.model.displayName} selected={event.selected} />;
  }

  matchModel(model: DefaultWorkspacePanelModel): boolean {
    return model.type === DefaultWorkspacePanelFactory.TYPE;
  }
}
