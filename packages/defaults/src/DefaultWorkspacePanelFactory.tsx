import { DefaultWorkspacePanelModel } from './DefaultWorkspacePanelModel';
import * as React from 'react';
import { DefaultPanelTitleWidget } from './widgets/DefaultPanelTitleWidget';
import { DefaultPanelContentWidget } from './widgets/DefaultPanelContentWidget';
import { GenerateEvent, WorkspacePanelFactory } from '@projectstorm/react-workspaces-core';

export class DefaultWorkspacePanelFactory extends WorkspacePanelFactory<DefaultWorkspacePanelModel> {
	static TYPE = 'default';

	constructor() {
		super(DefaultWorkspacePanelFactory.TYPE);
	}

	generatePanelTitle(event): JSX.Element {
		return <DefaultPanelTitleWidget title={event.model.displayName} />;
	}

	generatePanelContent(event: GenerateEvent<DefaultWorkspacePanelModel>): JSX.Element {
		return <DefaultPanelContentWidget>Hello World: {event.model.displayName}</DefaultPanelContentWidget>;
	}

	generateModel(): DefaultWorkspacePanelModel {
		return new DefaultWorkspacePanelModel('Test');
	}
}
