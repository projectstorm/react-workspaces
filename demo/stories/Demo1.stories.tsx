import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';
import 'typeface-open-sans';
import {
	WorkspaceEngine,
	WorkspaceNodeFactory,
	WorkspaceNodeModel,
	WorkspaceWidget,
	DebugLayer
} from '@projectstorm/react-workspaces-core';
import {
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel
} from '@projectstorm/react-workspaces-defaults';
import { draggingItemBehavior } from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { draggingItemDividerBehavior } from '@projectstorm/react-workspaces-behavior-divider-dropzone';
import { WorkspaceTabModel, WorkspaceTabFactory } from '@projectstorm/react-workspaces-model-tabs';
import { WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';
import { ResizeDividersLayer } from '@projectstorm/react-workspaces-behavior-resize';
import { DefaultPanelTabRenderer } from '@projectstorm/react-workspaces-defaults/dist';

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
const CompInternal: React.FC<{ model: WorkspaceNodeModel }> = (props) => {
	const [engine] = useState(() => {
		const e = new WorkspaceEngine();

		e.registerFactory(new DefaultWorkspacePanelFactory());
		e.registerFactory(new WorkspaceNodeFactory());

		const tabFactory = new WorkspaceTabFactory();
		tabFactory.addTabRenderer(new DefaultPanelTabRenderer());
		// TODO some bullshit error me thinks
		// @ts-ignore
		e.registerFactory(tabFactory);
		// @ts-ignore
		e.registerFactory(new DefaultTrayFactory());
		return e;
	});

	useEffect(() => {
		draggingItemBehavior(engine);
		draggingItemDividerBehavior(engine);
		engine.layerManager.addLayer(new ResizeDividersLayer());
		engine.layerManager.addLayer(
			new DebugLayer({
				dividers: false,
				resizeDividers: true,
				panels: false
			})
		);
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
				new WorkspaceTabModel()
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
