import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
	DebugLayer,
	ResizeOverlayWidget,
	WorkspaceEngine,
	WorkspaceNodeModel,
	WorkspaceTabbedModel,
	WorkspaceTabFactory,
	WorkspaceWidget,
	WorkspaceNodeFactory,
	WorkspaceTrayModel
} from '@projectstorm/react-workspaces-core';
import {
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel,
	draggingItemBehavior,
	ResizeDividersLayer
} from '@projectstorm/react-workspaces-defaults';
import 'typeface-open-sans';

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

const CompInternal: React.FC<{ model: WorkspaceNodeModel }> = (props) => {
	const [engine] = useState(() => {
		const e = new WorkspaceEngine();
		// @ts-ignore
		e.registerFactory(new WorkspaceTabFactory());
		e.registerFactory(new DefaultWorkspacePanelFactory());
		e.registerFactory(new WorkspaceNodeFactory());
		// @ts-ignore
		e.registerFactory(new DefaultTrayFactory());
		return e;
	});

	useEffect(() => {
		draggingItemBehavior(engine);
		engine.layerManager.addLayer(
			new DebugLayer({
				dividers: false,
				resizeDividers: true,
				panels: false
			})
		);
		engine.layerManager.addLayer(new ResizeDividersLayer({}));
	}, []);

	return (
		<S.Container>
			<WorkspaceWidget
				engine={engine}
				model={props.model}
				dividerColor="rgb(0,192,255)"
				dividerColorActive="rgb(192,255,0)"
			/>
		</S.Container>
	);
};

export const Comp1 = () => {
	const [model] = useState(() => {
		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);
		model

			//left panel
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					.addModel(new DefaultWorkspacePanelModel('Panel 1').setExpand(false, false))
					.addModel(new DefaultWorkspacePanelModel('Panel 2'))
			)
			.addModel(
				new WorkspaceTrayModel()
					.setExpand(false)
					.setVertical(true)
					.addModel(new DefaultWorkspacePanelModel('Panel 1'))
					.addModel(new DefaultWorkspacePanelModel('Panel 2'))
			)

			//right panel
			// .addModel(new DefaultWorkspacePanelModel('Panel 3'))
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					// .setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			)
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					// .setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			)
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(true)
					.setVertical(true)
					// .setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			);
		return model;
	});
	return <CompInternal model={model} />;
};

export const Comp2 = () => {
	const [model] = useState(() => {
		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);
		model

			//left panel
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					.addModel(new DefaultWorkspacePanelModel('Panel 1').setExpand(false, false))
					.addModel(new DefaultWorkspacePanelModel('Panel 2'))
			)
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
			// .addModel(new DefaultWorkspacePanelModel('Panel 3'))
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					// .setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			)
			.addModel(
				new WorkspaceNodeModel()
					.setExpand(false)
					.setVertical(true)
					// .setMode('micro')
					.addModel(new DefaultWorkspacePanelModel('Panel 4'))
					.addModel(new DefaultWorkspacePanelModel('Panel 5'))
					.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			);
		return model;
	});
	return <CompInternal model={model} />;
};

export default {
	title: 'Workspace',
	parameters: {
		layout: 'fullscreen'
	}
};
