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
    const parent = props.model.parent;
    if (!(parent instanceof WorkspaceTabModel)) {
      return;
    }

    return parent.registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
  }, [forceUpdate, props.model]);

  // A tab can be detached while its old tab group is still rendering. During
  // that transition its parent is already the destination model, not a tab
  // group, so it must no longer use tab-group selection APIs.
  const parent = props.model.parent;
  const tabGroup = parent instanceof WorkspaceTabModel ? parent : null;
  const selected = tabGroup?.getSelected();

  return (
    <DraggableWidget
      onClick={() => {
        tabGroup?.setSelected(props.model);
      }}
      engine={props.engine}
      model={props.model}
    >
      {props.factory.renderTabForModel(props.model, props.model.id === selected?.id, props.engine)}
    </DraggableWidget>
  );
};
