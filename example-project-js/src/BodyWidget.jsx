import * as React from 'react';
import { useState } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import {
  WorkspaceEngine,
  WorkspaceNodeFactory,
  WorkspaceNodeModel,
  WorkspaceWidget
} from '@projectstorm/react-workspaces-core';
import { resizingBehavior } from '@projectstorm/react-workspaces-behavior-resize';
import { MyCustomPanelModel, MyCustomPanelModelFactory } from './MyCustomPanelModel';

const s_global = css`
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #application {
    height: 100%;
    background: rgb(240, 240, 240);
  }
`;

const Root = styled.div`
  background: rgb(240, 240, 240);
  height: 100%;
  box-sizing: border-box;
`;

export const BodyWidget = () => {
  const [model] = useState(() => {
    const m = new WorkspaceNodeModel();

    // root layout is horizontal
    m.setHorizontal(true);

    // add two of our own models
    m.addModel(new MyCustomPanelModel('i am a sidebar').setExpand(false, true));
    m.addModel(new MyCustomPanelModel('i am content').setExpand(true, true));

    return m;
  });
  const [engine] = useState(() => {
    const e = new WorkspaceEngine();

    e.registerFactory(new WorkspaceNodeFactory());
    e.registerFactory(new MyCustomPanelModelFactory());

    // we want resize behavior
    resizingBehavior(e);

    return e;
  });

  return (
    <>
      <Global styles={s_global} />
      <Root>
        <WorkspaceWidget model={model} engine={engine} />
      </Root>
    </>
  );
};
