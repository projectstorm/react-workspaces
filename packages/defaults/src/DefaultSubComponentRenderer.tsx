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
import {
  FloatingWindowRenderer,
  FloatingWindowSubRendererEvent
} from '@projectstorm/react-workspaces-model-floating-window';

export class DefaultSubComponentRenderer
  implements
    TabRenderer<DefaultWorkspacePanelModel>,
    WorkspaceNodePanelRenderer<DefaultWorkspacePanelModel>,
    TrayModelPanelRenderer<DefaultWorkspacePanelModel>,
    FloatingWindowRenderer<DefaultWorkspacePanelModel>
{
  renderIcon(event: TrayModelPanelRendererEvent<DefaultWorkspacePanelModel>): React.JSX.Element {
    return (
      <DefaultPanelMicroButtonWidget
        smaller={event.parent.mode === WorkspaceTrayMode.NORMAL}
        selected={event.selected}
        icon={event.model.icon}
      />
    );
  }

  renderTitleBar(event: RenderTitleBarEvent<DefaultWorkspacePanelModel>): React.JSX.Element {
    return (
      <DefaultPanelTitleWidget
        title={event.model.displayName}
        close={() => {
          event.model.delete();
          event.engine.normalize();
        }}
      />
    );
  }

  renderTab(event: TabRendererEvent<DefaultWorkspacePanelModel>): React.JSX.Element {
    return <DefaultPanelTabWidget name={event.model.displayName} selected={event.selected} />;
  }

  matchModel(model: DefaultWorkspacePanelModel): boolean {
    return model.type === DefaultWorkspacePanelFactory.TYPE;
  }

  renderWindowTitle(event: FloatingWindowSubRendererEvent<DefaultWorkspacePanelModel>): any {
    return (
      <DefaultPanelTitleWidget
        title={event.model.displayName}
        close={() => {
          event.model.parent.delete();
          event.engine.normalize();
        }}
      />
    );
  }
}
