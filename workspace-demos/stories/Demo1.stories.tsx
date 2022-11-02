import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
	ResizeOverlayWidget,
	WorkspaceEngine,
	WorkspaceNodeModel,
	WorkspaceTabbedModel,
	WorkspaceTabFactory,
	WorkspaceWidget
} from '@projectstorm/react-workspaces-core';
import {
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel,
	draggingItemBehavior,
	DropZoneLayer
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

export const ResizeHorizontal = () => {
	return (
		<S.Container>
			<ResizeOverlayWidget vertical={false} />
		</S.Container>
	);
};

export const ResizeVertical = () => {
	return (
		<S.Container>
			<ResizeOverlayWidget vertical={true} />
		</S.Container>
	);
};

export const Comp = () => {
	const [engine] = useState(() => {
		const e = new WorkspaceEngine();
		e.registerFactory(new WorkspaceTabFactory());
		e.registerFactory(new DefaultWorkspacePanelFactory());
		e.registerFactory(new DefaultTrayFactory());
		return e;
	});

	const [model] = useState(() => {
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
		return model;
	});

	useEffect(() => {
		draggingItemBehavior(engine);
	}, []);

	return (
		<S.Container>
			<WorkspaceWidget
				engine={engine}
				model={model}
				dividerColor="rgb(0,192,255)"
				dividerColorActive="rgb(192,255,0)"
			/>
		</S.Container>
	);
};

export default {
	title: 'Workspace',
	parameters: {
		layout: 'fullscreen'
	}
};
