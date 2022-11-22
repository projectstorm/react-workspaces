import * as React from 'react';
import styled from '@emotion/styled';
import {
  DraggableWidget,
  SmartOrderingWidget,
  useForceUpdate,
  useModelElement,
  WorkspaceEngine
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';
import { useEffect } from 'react';
import { TabButtonWidget } from './TabButtonWidget';
import * as _ from 'lodash';
import { WorkspaceTabFactory } from './WorkspaceTabFactory';

export interface TabGroupWidgetProps {
  model: WorkspaceTabModel;
  engine: WorkspaceEngine;
  factory: WorkspaceTabFactory;
}

namespace S {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;
    height: 100%;
  `;

  export const Draggable = styled(DraggableWidget)`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
    position: relative;
  `;

  export const Content = styled.div`
    flex-grow: 1;
    display: flex;
    height: 100%;
  `;

  export const TabGroup = styled(SmartOrderingWidget)`
    display: flex;
    overflow-x: auto;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &::-webkit-scrollbar {
      display: none;  /* Safari and Chrome */
    }
  `;
}
export const TabGroupWidget: React.FC<TabGroupWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return props.model.registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
  }, []);
  const ref = useModelElement({
    model: props.model,
    engine: props.engine
  });

  let selected = props.model.getSelected();
  let selectedFactory = props.engine.getFactory(selected);

  return (
    <S.Container>
      <S.Draggable engine={props.engine} model={props.model}>
        {props.factory.generateTabsContainer(
          <S.TabGroup
            dropped={({ model, index }) => {
              props.model.addModel(model, index);
              props.engine.normalize();
            }}
            engine={props.engine}
            vertical={false}
            children={_.map(props.model.children, (child) => {
              return <TabButtonWidget factory={props.factory} model={child} engine={props.engine} key={child.id} />;
            })}
          />
        )}
      </S.Draggable>
      <S.Content ref={ref}>
        {selectedFactory.generateContent({
          model: selected,
          engine: props.engine
        })}
      </S.Content>
    </S.Container>
  );
};
