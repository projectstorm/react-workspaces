import { DefaultWorkspacePanelModel } from './DefaultWorkspacePanelModel';
import * as React from 'react';
import { DefaultPanelContentWidget } from './widgets/DefaultPanelContentWidget';
import { WorkspaceModelFactory, WorkspaceModelFactoryEvent } from '@projectstorm/react-workspaces-core';

export class DefaultWorkspacePanelFactory extends WorkspaceModelFactory<DefaultWorkspacePanelModel> {
	static TYPE = 'default';

	constructor() {
		super(DefaultWorkspacePanelFactory.TYPE);
	}

	generateContent(event: WorkspaceModelFactoryEvent<DefaultWorkspacePanelModel>): JSX.Element {
		return <DefaultPanelContentWidget>Hello World: {event.model.displayName}</DefaultPanelContentWidget>;
	}

	generateModel(): DefaultWorkspacePanelModel {
		return new DefaultWorkspacePanelModel('Test');
	}
}
