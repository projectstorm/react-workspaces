import * as React from 'react';
import { useEffect } from 'react';
import { Layer, useForceUpdate, WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { DropzoneDividerTheme, DropzoneDividerWidget } from './DropzoneDividerWidget';

export interface DropzoneDividersLayerOptions {
  theme?: () => DropzoneDividerTheme;
}

export class DropzoneDividersLayer extends Layer {
  constructor(protected options2: DropzoneDividersLayerOptions) {
    super({
      mouseEvents: false
    });
  }

  renderLayer(event): React.JSX.Element {
    return <DropzoneDividersLayerWidget engine={event.engine} theme={this.options2.theme} />;
  }
}

export interface DropzoneDividersLayerWidgetProps {
  engine: WorkspaceEngine;
  theme?: () => DropzoneDividerTheme;
}

export const DropzoneDividersLayerWidget: React.FC<DropzoneDividersLayerWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate(true);

  useEffect(() => {
    return props.engine.registerListener({
      layoutInvalidated: () => {
        forceUpdate();
      }
    });
  }, []);

  return (
    <>
      {props.engine.rootModel
        .flatten()
        .filter((p) => p instanceof WorkspaceNodeModel)
        .flatMap((m: WorkspaceNodeModel) => {
          return m.r_divisions.map((division, index) => {
            return (
              <DropzoneDividerWidget
                theme={props.theme?.()}
                engine={props.engine}
                dimension={division}
                key={division.id}
                handleDrop={(model) => {
                  m.addModel(model, index);
                  props.engine.normalize();
                }}
              />
            );
          });
        })}
    </>
  );
};
