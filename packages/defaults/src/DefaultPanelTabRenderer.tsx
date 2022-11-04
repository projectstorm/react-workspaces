import * as React from 'react';
import { TabRenderer, TabRendererEvent } from '@projectstorm/react-workspaces-model-tabs';
import { DefaultWorkspacePanelModel } from './DefaultWorkspacePanelModel';
import { DefaultWorkspacePanelFactory } from './DefaultWorkspacePanelFactory';
import { DefaultPanelTabWidget } from './widgets/DefaultPanelTabWidget';

export class DefaultPanelTabRenderer implements TabRenderer<DefaultWorkspacePanelModel> {
	matchModel(model: DefaultWorkspacePanelModel): boolean {
		return model.type === DefaultWorkspacePanelFactory.TYPE;
	}

	renderTab(event: TabRendererEvent<DefaultWorkspacePanelModel>) {
		return <DefaultPanelTabWidget name={event.model.displayName} selected={event.selected} />;
	}
}
