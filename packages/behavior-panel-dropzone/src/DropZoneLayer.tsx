import * as React from 'react';
import { Layer, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import { DropZoneLayerPanelTheme, DropZoneLayerPanelWidget, DropZonePanelDirective } from './DropZoneLayerPanelWidget';

export interface DropZoneLayerOptions {
  getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
  theme?: DropZoneLayerPanelTheme;
  modelID: string;
  debugModels: boolean;
}

export class DropZoneLayer extends Layer {
  constructor(private options2: DropZoneLayerOptions) {
    super({
      mouseEvents: false
    });
  }

  renderLayer(event): React.JSX.Element {
    return (
      <DropZoneLayerWidget
        debugModels={this.options2.debugModels}
        engine={event.engine}
        draggingModel={this.options2.modelID}
        getDropZoneForModel={this.options2.getDropZoneForModel}
        theme={this.options2.theme}
      />
    );
  }
}

//!--------------- widget ----------------

export interface DropZoneLayerWidgetProps {
  engine: WorkspaceEngine;
  getDropZoneForModel: (model: WorkspaceModel) => DropZonePanelDirective | null;
  draggingModel: string;
  debugModels: boolean;
  theme?: DropZoneLayerPanelTheme;
}

export const DropZoneLayerWidget: React.FC<DropZoneLayerWidgetProps> = (props) => {
  const draggingModelFlattened =
    props.engine.rootModel
      .flatten()
      .find((m) => m.id === props.draggingModel)
      ?.flatten() || [];

  return (
    <>
      {props.engine.rootModel
        .flatten()
        .filter((m) => m.r_visible)
        .filter((m) => {
          // filter out the dragging model and its children (cant add parent to children)
          return !draggingModelFlattened.find((child) => child.id === m.id);
        })
        // dont show a drop zone for the same model
        // .filter((m) => m.id !== props.draggingModel.id)
        .map((m) => {
          const directive = props.getDropZoneForModel(m);

          if (!directive) {
            return null;
          }

          return (
            <DropZoneLayerPanelWidget
              debug={props.debugModels}
              directive={directive}
              engine={props.engine}
              model={m}
              theme={props.theme}
              key={m.id}
            />
          );
        })}
    </>
  );
};
