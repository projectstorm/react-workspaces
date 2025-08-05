import { Layer, LayerManager } from '../LayerManager';
import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../../../core-models/WorkspaceCollectionModel';
import { DimensionTrackingWidget } from '../../primitives/DimensionTrackingWidget';
import { WorkspaceNodeModel } from '../../../entities/node/WorkspaceNodeModel';
import { useEffect } from 'react';
import { useForceUpdate } from '../../hooks/useForceUpdate';

export interface DebugLayerOptions {
  dividers?: boolean;
  panels?: boolean;
  resizeDividers?: boolean;
}

export class DebugLayer extends Layer {
  private l1: () => void;

  constructor(public debugOptions: DebugLayerOptions = { panels: true }) {
    super({
      mouseEvents: false
    });

    const l2 = this.registerListener({
      removed: () => {
        this.l1();
        l2();
      }
    });
  }

  setLayerManager(manager: LayerManager) {
    super.setLayerManager(manager);
    this.l1 = this.layerManager.registerListener({
      layerAdded: () => {
        // we defer this since other plugins might move stuff to the top
        _.defer(() => {
          this.moveToTop();
        });
      }
    });
  }

  updateOptions(options: Partial<DebugLayerOptions>) {
    this.debugOptions = {
      ...this.debugOptions,
      ...options
    };
    this.repaint();
  }

  renderLayer(event): React.JSX.Element {
    return <DebugLayerWidget options={this.debugOptions} engine={event.engine} model={event.model} />;
  }
}

export interface DebugLayerWidgetProps {
  engine: WorkspaceEngine;
  model: WorkspaceModel;
  options: DebugLayerOptions;
}

export const DebugPanel: React.FC<{ model: WorkspaceModel }> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return props.model.registerListener({
      visibilityChanged: () => {
        forceUpdate();
      }
    });
  }, []);
  if (!props.model.r_visible) {
    return null;
  }
  return (
    <S.Outline2 dimension={props.model.r_dimensions}>
      <S.DebugID>{props.model.id.substring(0, 7)}</S.DebugID>
    </S.Outline2>
  );
};

export const DebugLayerWidget: React.FC<DebugLayerWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate(true);
  useEffect(() => {
    props.model.registerListener({
      layoutInvalidated: () => {
        forceUpdate();
      },
      dimensionsInvalidated: () => {
        forceUpdate();
      }
    });
  }, []);

  return (
    <>
      {props.options?.panels
        ? props.model
            .flatten()
            .filter((p) => !(p instanceof WorkspaceCollectionModel))
            .map((m) => {
              return <DebugPanel model={m} key={m.id} />;
            })
        : []}

      {props.options?.dividers
        ? props.model
            .flatten()
            .filter((p) => p instanceof WorkspaceNodeModel)
            .flatMap((m: WorkspaceNodeModel) => m.r_divisions)
            .map((m) => {
              return <S.Outline dimension={m} key={m.id} />;
            })
        : []}

      {props.options?.resizeDividers
        ? props.model
            .flatten()
            .filter((p) => p instanceof WorkspaceNodeModel)
            .flatMap((m: WorkspaceNodeModel) => m.getResizeDivisions())
            .map((m) => {
              return <S.Outline dimension={m.dimensions} key={m.dimensions.id} />;
            })
        : []}
    </>
  );
};

namespace S {
  export const Outline = styled(DimensionTrackingWidget)`
    box-sizing: border-box;
    border: dashed red 1px;
  `;

  export const Outline2 = styled(DimensionTrackingWidget)`
    box-sizing: border-box;
    border: solid cyan 1px;
  `;

  export const DebugID = styled.div`
    background: cyan;
    color: black;
    font-size: 10px;
    padding: 2px;
    display: inline-block;
    top: 0;
    right: 0;
    position: absolute;
  `;
}
