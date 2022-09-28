import * as React from 'react';
import styled from '@emotion/styled';
import {
	WorkspaceEngine,
	WorkspaceNodeModel,
	WorkspaceTabbedModel,
	WorkspaceTabFactory,
	WorkspaceWidget
} from '@projectstorm/react-workspaces-core';
import {
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel
} from '@projectstorm/react-workspaces-defaults';
import 'typeface-open-sans';

export interface Demo1State {
	engine: WorkspaceEngine;
	model: WorkspaceNodeModel;
}

namespace S {
	export const Container = styled.div`
		background: rgb(70, 70, 70);
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		font-family: 'Open Sans';
	`;
}

export class Demo1Stories extends React.Component<any, Demo1State> {
	constructor(props) {
		super(props);
		let engine = new WorkspaceEngine();
		engine.registerFactory(new WorkspaceTabFactory());
		engine.registerFactory(new DefaultWorkspacePanelFactory());
		engine.registerFactory(new DefaultTrayFactory());

		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);
		model

			//left panel
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					.addModel(new DefaultWorkspacePanelModel('Panel 1'))
					.addModel(new DefaultWorkspacePanelModel('Panel 2'))
			)

			//tab panel
			.addModel(
				new WorkspaceTabbedModel()
					.addModel(new DefaultWorkspacePanelModel('Tab 1'))
					.addModel(new DefaultWorkspacePanelModel('Tab 2'))
					.addModel(new DefaultWorkspacePanelModel('Tab 3'))
			)

			//right panel
			.addModel(new DefaultWorkspacePanelModel('Panel 3'))
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					.setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			);

		this.state = {
			engine: engine,
			model: model
		};
	}

	render() {
		return (
			<S.Container>
				<WorkspaceWidget engine={this.state.engine} model={this.state.model} />
			</S.Container>
		);
	}
}

export const Comp = () => {
	return <Demo1Stories />;
};

export default {
	title: 'Workspace',
	parameters: {
		layout: 'fullscreen'
	}
};
