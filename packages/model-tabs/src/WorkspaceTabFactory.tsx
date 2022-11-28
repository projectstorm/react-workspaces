import { TabGroupWidget } from './TabGroupWidget';
import * as React from 'react';
import {
  SubComponentModelFactory,
  SubComponentRenderer,
  WorkspaceModel,
  WorkspaceModelFactoryEvent
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';
import styled from '@emotion/styled';

export interface TabRendererEvent<T extends WorkspaceModel> {
  model: T;
  selected: boolean;
}

export interface TabRenderer<T extends WorkspaceModel = WorkspaceModel> extends SubComponentRenderer<T> {
  renderTab(event: TabRendererEvent<T>): JSX.Element;
}

export class WorkspaceTabFactory<T extends WorkspaceTabModel = WorkspaceTabModel> extends SubComponentModelFactory<
  T,
  TabRenderer
> {
  constructor() {
    super(WorkspaceTabModel.NAME);
  }

  generateModel(): T {
    return new WorkspaceTabModel() as T;
  }

  renderTabForModel(model: WorkspaceModel, selected: boolean) {
    const r = this.getRendererForModel(model);
    if (r) {
      return r.renderTab({
        model: model,
        selected: selected
      });
    }
    return <span>{model.type}</span>;
  }

  generateTabsContainer(content: JSX.Element) {
    return <S.TabHeader>{content}</S.TabHeader>;
  }

  generateContent(event: WorkspaceModelFactoryEvent<T>): JSX.Element {
    return <TabGroupWidget factory={this} key={event.model.id} model={event.model} engine={event.engine} />;
  }
}

namespace S {
  export const TabHeader = styled.div`
    min-height: 30px;
  `;
}
