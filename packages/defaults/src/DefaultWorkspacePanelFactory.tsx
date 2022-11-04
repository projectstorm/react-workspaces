import { DefaultWorkspacePanelModel } from './DefaultWorkspacePanelModel';
import * as React from 'react';
import { DefaultPanelTitleWidget } from './widgets/DefaultPanelTitleWidget';
import { DefaultPanelContentWidget } from './widgets/DefaultPanelContentWidget';
import { DefaultPanelMicroButtonWidget } from './widgets/DefaultPanelMicroButtonWidget';
import { DefaultPanelTabWidget } from './widgets/DefaultPanelTabWidget';
import {
	GenerateEvent,
	GenerateMicroButtonEvent,
	GeneratePanelTabEvent,
	WorkspacePanelFactory
} from '@projectstorm/react-workspaces-core';

export class DefaultWorkspacePanelFactory extends WorkspacePanelFactory<DefaultWorkspacePanelModel> {
	constructor() {
		super('default');
	}

	generatePanelTitle(event): JSX.Element {
		return <DefaultPanelTitleWidget title={event.model.displayName} />;
	}

	generatePanelContent(event: GenerateEvent<DefaultWorkspacePanelModel>): JSX.Element {
		return <DefaultPanelContentWidget>Hello World: {event.model.displayName}</DefaultPanelContentWidget>;
	}

	generatePanelTab(event: GeneratePanelTabEvent<DefaultWorkspacePanelModel>): JSX.Element {
		return <DefaultPanelTabWidget name={event.model.displayName} selected={event.selected} />;
	}

	generateMicroButton(event: GenerateMicroButtonEvent<DefaultWorkspacePanelModel>): JSX.Element {
		return <DefaultPanelMicroButtonWidget selected={event.selected} icon={event.model.icon} />;
	}

	generateModel(): DefaultWorkspacePanelModel {
		return new DefaultWorkspacePanelModel('Test');
	}
}
