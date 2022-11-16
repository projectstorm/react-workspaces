import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { DefaultWorkspacePanelModel } from '@projectstorm/react-workspaces-defaults';
import { WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { CompInternal, genVerticalNode, useEngine } from './helpers/tools';
import { WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';

export const ComplexLayout = function (args) {
	const engine = useEngine(args);
	const [model] = useState(() => {
		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);
		model

			//left panel
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())

			//tab panel
			.addModel(
				new WorkspaceTabModel()
					.addModel(new DefaultWorkspacePanelModel('Tab 1'))
					.addModel(new DefaultWorkspacePanelModel('Tab 2'))
					.addModel(new DefaultWorkspacePanelModel('Tab 3'))
			)

			//right panel
			// .addModel(new DefaultWorkspacePanelModel('Panel 3'))
			.addModel(
				new WorkspaceTrayModel()
					.setExpand(false, true)
					.addModel(new DefaultWorkspacePanelModel('Tray panel 1'))
					.addModel(new DefaultWorkspacePanelModel('Tray panel 2'))
					.addModel(new DefaultWorkspacePanelModel('Tray panel 3'))
			)
			.addModel(genVerticalNode());
		return model;
	});
	return <CompInternal model={model} engine={engine} />;
}.bind({});

ComplexLayout.args = {
	DebugDividers: false,
	DebugPanels: false,
	DebugResizers: false
};

export default {
	title: 'Workspace',
	parameters: {
		layout: 'fullscreen'
	}
};
