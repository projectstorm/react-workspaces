import * as React from 'react';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import 'typeface-open-sans';
import {
  DebugLayer,
  ExpandNodeModel,
  overConstrainRecomputeBehavior,
  WorkspaceEngine,
  WorkspaceNodeFactory,
  WorkspaceNodeModel,
  WorkspaceWidget
} from '@projectstorm/react-workspaces-core';
import {
  DefaultSubComponentRenderer,
  DefaultTrayFactory,
  DefaultWindowModelFactory,
  DefaultWorkspacePanelFactory,
  DefaultWorkspacePanelModel
} from '@projectstorm/react-workspaces-defaults';
import {
  draggingItemBehavior,
  getDirectiveForWorkspaceNode
} from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { draggingItemDividerBehavior } from '@projectstorm/react-workspaces-behavior-divider-dropzone';
import { WorkspaceTabFactory } from '@projectstorm/react-workspaces-model-tabs';
import { resizingBehavior } from '@projectstorm/react-workspaces-behavior-resize';
import { RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';
import { ConvertToTabZone, getDirectiveForTabModel } from '@projectstorm/react-workspaces-dropzone-plugin-tabs';
import { ConvertToTrayZone, getDirectiveForTrayModel } from '@projectstorm/react-workspaces-dropzone-plugin-tray';
import { css, Global } from 'storybook/theming';

export const genVerticalNode = () => {
  const m1 = new DefaultWorkspacePanelModel('Panel 1');
  m1.minimumSize.update({
    width: 10,
    height: 100
  });

  const m2 = new DefaultWorkspacePanelModel('Panel 2');
  m2.minimumSize.update({
    width: 10,
    height: 100
  });
  return new ExpandNodeModel().setExpand(false, true).setVertical(true).addModel(m1).addModel(m2);
};

export enum DebugOptions {
  DebugDividers = 'DebugDividers',
  DebugPanels = 'DebugPanels',
  DebugResizers = 'DebugResizers',
  DebugWindows = 'DebugWindows'
}

export const SharedArgs = {
  [DebugOptions.DebugPanels]: false,
  [DebugOptions.DebugDividers]: false,
  [DebugOptions.DebugResizers]: false,
  [DebugOptions.DebugWindows]: false
};

export const useRootModel = (model: RootWorkspaceModel, args) => {
  useEffect(() => {
    model.setDebug(args[DebugOptions.DebugWindows]);
  }, [args[DebugOptions.DebugWindows]]);
  return model;
};

export const useEngine = (args: { DebugDividers?: boolean; DebugResizers?: boolean; DebugPanels?: boolean } = {}) => {
  const [debugLayer] = useState(() => {
    return new DebugLayer({
      dividers: args[DebugOptions.DebugDividers],
      resizeDividers: args[DebugOptions.DebugResizers],
      panels: args[DebugOptions.DebugPanels]
    });
  });
  const [engine] = useState(() => {
    const e = new WorkspaceEngine();

    const commonRenderer = new DefaultSubComponentRenderer();

    const windowFactory = new DefaultWindowModelFactory();
    const tabFactory = new WorkspaceTabFactory();
    const trayFactory = new DefaultTrayFactory({
      windowFactory: windowFactory,
      installIconPositionListener: true,
      installEngineLockListener: true
    });
    const workspaceNodeFactory = new WorkspaceNodeFactory();

    e.registerFactory(new DefaultWorkspacePanelFactory());

    tabFactory.addRenderer(commonRenderer);
    trayFactory.addRenderer(commonRenderer);
    workspaceNodeFactory.addRenderer(commonRenderer);
    windowFactory.addRenderer(commonRenderer);

    e.registerFactory(tabFactory);
    e.registerFactory(trayFactory);
    e.registerFactory(workspaceNodeFactory);
    e.registerFactory(windowFactory);

    overConstrainRecomputeBehavior({
      engine: e
    });

    draggingItemBehavior({
      engine: e,
      getDropZoneForModel: (model) => {
        return (
          getDirectiveForTrayModel(model) ||
          getDirectiveForWorkspaceNode({
            node: model,
            transformZones: [ConvertToTabZone(tabFactory), ConvertToTrayZone(trayFactory)],
            generateParentNode: () => new ExpandNodeModel()
          }) ||
          getDirectiveForTabModel(model)
        );
      },
      debug: false
    });
    draggingItemDividerBehavior({
      engine: e
    });
    resizingBehavior(e);

    e.layerManager.addLayer(debugLayer);
    return e;
  });
  useEffect(() => {
    debugLayer.updateOptions({
      dividers: args.DebugDividers,
      resizeDividers: args.DebugResizers,
      panels: args.DebugPanels
    });
  }, [args.DebugDividers, args.DebugResizers, args.DebugPanels]);
  return engine;
};

export const CompInternal: React.FC<{ model: WorkspaceNodeModel; engine: WorkspaceEngine }> = (props) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #storybook-root {
            height: 100%;
          }
        `}
      />
      <S.Container>
        <WorkspaceWidget engine={props.engine} model={props.model} />
      </S.Container>
    </>
  );
};

export const Buttons: React.FC<React.PropsWithChildren<{ btns: { [key: string]: () => any } }>> = (props) => {
  return (
    <S.Container2>
      <S.Buttons>
        {_.map(props.btns, (btnCallback, btn) => {
          return (
            <S.Button onClick={btnCallback} key={btn}>
              {btn}
            </S.Button>
          );
        })}
      </S.Buttons>
      {props.children}
    </S.Container2>
  );
};

namespace S {
  export const Container2 = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: rgb(30, 30, 30);
    box-sizing: border-box;
  `;

  export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    padding-left: 40px;
  `;

  export const Button = styled.div`
    padding: 5px 10px;
    color: white;
    background: black;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Open Sans';
    margin-right: 5px;
    user-select: none;

    &:hover {
      background: rgb(0, 192, 255);
    }
  `;

  export const Container = styled.div`
    flex-grow: 1;
    padding: 40px;
    background: rgb(70, 70, 70);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Open Sans';
  `;
}
