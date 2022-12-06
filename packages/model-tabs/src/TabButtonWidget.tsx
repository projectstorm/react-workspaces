import { DraggableWidget, useForceUpdate, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { useEffect } from 'react';
import { WorkspaceTabFactory } from './WorkspaceTabFactory';
import { WorkspaceTabModel } from './WorkspaceTabModel';

export interface TabButtonWidgetProps {
  model: WorkspaceModel;
  engine: WorkspaceEngine;
  factory: WorkspaceTabFactory;
}

export const TabButtonWidget: React.FC<TabButtonWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return (props.model.parent as WorkspaceTabModel).registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
  }, []);
  const parent = props.model.parent as WorkspaceTabModel;
  return (
    <DraggableWidget
      onClick={() => {
        (props.model.parent as WorkspaceTabModel).setSelected(props.model);
      }}
      engine={props.engine}
      model={props.model}
    >
      {props.factory.renderTabForModel(props.model, props.model.id === parent.getSelected().id, props.engine)}
    </DraggableWidget>
  );
};
