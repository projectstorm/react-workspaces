import {
  FloatingWindowFactory,
  FloatingWindowModel,
  FloatingWindowRendererEvent
} from '@projectstorm/react-workspaces-model-floating-window';
import { WorkspaceModel } from '@projectstorm/react-workspaces-core';
import * as React from 'react';
import { DefaultFloatingWindowWidget } from '../widgets/DefaultFloatingWindowWidget';

export class DefaultWindowModel extends FloatingWindowModel {
  constructor(child?: WorkspaceModel) {
    super(DefaultWindowModelFactory.TYPE, child);
    this.setSize({
      width: 200,
      height: 200
    });
  }
}

export class DefaultWindowModelFactory extends FloatingWindowFactory<DefaultWindowModel> {
  static TYPE = 'floating-window';

  constructor() {
    super(DefaultWindowModelFactory.TYPE);
  }

  generateModel(): FloatingWindowModel {
    return new DefaultWindowModel();
  }

  generateContent(event: FloatingWindowRendererEvent<DefaultWindowModel>): JSX.Element {
    return <DefaultFloatingWindowWidget {...event} />;
  }
}
