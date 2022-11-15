import * as React from 'react';
import { useState } from 'react';
import 'typeface-open-sans';
import { WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { CompInternal, genVerticalNode, useEngine } from './helpers/tools';

export const Basic = function (args) {
	const engine = useEngine(args);
	const [model] = useState(() => {
		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);
		model

			//left panel
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode().setExpand(true));
		return model;
	});
	return <CompInternal model={model} engine={engine} />;
}.bind({});

Basic.args = {
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
