import * as React from 'react';
import { useEffect } from 'react';
import { TrayIconPosition, WorkspaceTrayMode, WorkspaceTrayModel } from './WorkspaceTrayModel';
import styled from '@emotion/styled';
import {
  DraggableWidget,
  useForceUpdate,
  useModelElement,
  WorkspaceEngine,
  WorkspaceModel
} from '@projectstorm/react-workspaces-core';
import { MicroLayoutWidget } from './MicroLayoutWidget';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';

export interface TrayWidgetProps {
  node: WorkspaceTrayModel;
  engine: WorkspaceEngine;
  header: React.JSX.Element;
  className?: any;
  factory: WorkspaceTrayFactory;
}

namespace S {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 0;
  `;

  export const MicroLayout = styled(MicroLayoutWidget)`
    flex-grow: 1;
  `;

  export const MicroLayoutShrink = styled(MicroLayoutWidget)`
    flex-grow: 0;
    flex-shrink: 0;
  `;

  export const Content = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    min-height: 0;
  `;

  export const PanelContent = styled.div`
    display: flex;
    flex-grow: 1;
    min-width: 0;
  `;
}

export interface PanelContentProps {
  model: WorkspaceModel;
  engine: WorkspaceEngine;
}

export const PanelContent: React.FC<PanelContentProps> = (props) => {
  const ref = useModelElement({
    model: props.model,
    engine: props.engine
  });
  return (
    <S.PanelContent ref={ref}>
      {props.engine.getFactory(props.model).generateContent({
        model: props.model,
        engine: props.engine
      })}
    </S.PanelContent>
  );
};

export const TrayContentExpanded: React.FC<TrayWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  let cont = [
    <S.MicroLayoutShrink key="a" node={props.node} engine={props.engine} factory={props.factory} />,
    <PanelContent key="b" engine={props.engine} model={props.node.getSelectedModel()} />
  ];
  if (props.node.iconBarPosition === TrayIconPosition.RIGHT) {
    cont.reverse();
  }
  useEffect(() => {
    return props.node.registerListener({
      iconPositionChanged: () => {
        forceUpdate();
      }
    });
  }, []);
  return <S.Content>{cont}</S.Content>;
};

export const TrayContentShrink: React.FC<TrayWidgetProps> = (props) => {
  return <S.MicroLayout node={props.node} engine={props.engine} factory={props.factory} />;
};

export const TrayWidget: React.FC<TrayWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return props.node.registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
  }, []);
  return (
    <S.Container className={props.className}>
      {
        <DraggableWidget model={props.node} engine={props.engine}>
          {props.header}
        </DraggableWidget>
      }
      {props.node.mode === WorkspaceTrayMode.NORMAL ? (
        <TrayContentExpanded {...props} />
      ) : (
        <TrayContentShrink {...props} />
      )}
    </S.Container>
  );
};
