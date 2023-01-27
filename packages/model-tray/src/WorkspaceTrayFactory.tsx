import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import {
  WorkspaceModel,
  WorkspaceModelFactoryEvent,
  WorkspaceNodeFactory,
  WorkspaceNodePanelRenderer
} from '@projectstorm/react-workspaces-core';
import { FloatingWindowFactory } from '@projectstorm/react-workspaces-model-floating-window';
import { setupIconPositionBehavior } from './behaviors/iconPositionBehavior';
import { setupTrayWindowDragLockBehavior } from './behaviors/trayWindowDragLockBehavior';

export interface TrayModelPanelRendererEvent<T extends WorkspaceModel> {
  model: T;
  parent: WorkspaceTrayModel;
  selected: boolean;
}

export interface TrayModelPanelRenderer<T extends WorkspaceModel = WorkspaceModel> extends WorkspaceNodePanelRenderer {
  renderIcon(event: TrayModelPanelRendererEvent<T>): JSX.Element;
}

export interface WorkspaceTrayFactoryOptions {
  windowFactory: FloatingWindowFactory;
  /**
   * When enabled, the icons will render on the left or right depending on where the tray is rendered relative to
   * the root work space. If it is left-ish, the icons are rendered on the left and visa-versa
   */
  installIconPositionListener?: boolean;
  /**
   * If enabled, locking the engine, will prevent the floating window associated with this tray, from
   * being moved by the user directly. it will still move if the user selects an icon in the collapsed mode
   */
  installEngineLockListener?: boolean;
}

export class WorkspaceTrayFactory<T extends WorkspaceTrayModel = WorkspaceTrayModel> extends WorkspaceNodeFactory<
  T,
  TrayModelPanelRenderer
> {
  constructor(protected options: WorkspaceTrayFactoryOptions) {
    super(WorkspaceTrayModel.NAME);
    this.registerListener({
      modelGenerated: ({ model }) => {
        if (options.installIconPositionListener) {
          setupIconPositionBehavior(model);
        }
        if (options.installEngineLockListener) {
          setupTrayWindowDragLockBehavior(model, this.engine);
        }
      }
    });
  }

  protected _generateModel(): T {
    return new WorkspaceTrayModel({
      iconWidth: 50,
      factory: this.options.windowFactory
    }) as T;
  }

  generateTrayHeader(event: WorkspaceModelFactoryEvent<T>) {
    return null;
  }

  generateContent(event: WorkspaceModelFactoryEvent<T>): JSX.Element {
    return (
      <TrayWidget factory={this} header={this.generateTrayHeader(event)} node={event.model} engine={event.engine} />
    );
  }
}
