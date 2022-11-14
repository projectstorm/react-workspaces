import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import 'typeface-open-sans';
import {
	DebugLayer,
	WorkspaceEngine,
	WorkspaceNodeFactory,
	WorkspaceNodeModel,
	WorkspaceWidget
} from '@projectstorm/react-workspaces-core';
import {
	DefaultPanelTabRenderer,
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel
} from '@projectstorm/react-workspaces-defaults';
import { draggingItemBehavior } from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { draggingItemDividerBehavior } from '@projectstorm/react-workspaces-behavior-divider-dropzone';
import { WorkspaceTabFactory, WorkspaceTabModel } from '@projectstorm/react-workspaces-model-tabs';
import { resizingBehavior } from '@projectstorm/react-workspaces-behavior-resize';
import { FloatingWindowModel, RootWorkspaceModel } from '@projectstorm/react-workspaces-model-floating-window';

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

const genVerticalNode = () => {
	const node = new WorkspaceNodeModel()
		.setExpand(false)
		.setVertical(true)
		.addModel(new DefaultWorkspacePanelModel('Panel 1').setExpand(false, false))
		.addModel(new DefaultWorkspacePanelModel('Panel 2'));
	return node;
};

const useEngine = () => {
	const [engine] = useState(() => {
		const e = new WorkspaceEngine();

		e.registerFactory(new DefaultWorkspacePanelFactory());
		e.registerFactory(new WorkspaceNodeFactory());

		const tabFactory = new WorkspaceTabFactory();
		tabFactory.addTabRenderer(new DefaultPanelTabRenderer());
		e.registerFactory(tabFactory);
		e.registerFactory(new DefaultTrayFactory());
		return e;
	});
	return engine;
};

const CompInternal: React.FC<{ model: WorkspaceNodeModel }> = (props) => {
	const engine = useEngine();

	useEffect(() => {
		draggingItemBehavior(engine);
		draggingItemDividerBehavior(engine);
		resizingBehavior(engine);
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
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode())
			.addModel(genVerticalNode().setExpand(true));
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
			.addModel(genVerticalNode())
			.addModel(genVerticalNode());
		return model;
	});
	return <CompInternal model={model} />;
};

export const Comp3 = () => {
	const [model] = useState(() => {
		let model = new WorkspaceNodeModel();
		model.setHorizontal(true);

		const genNode2 = () => {
			const node = genVerticalNode();
			node.minimumSize.update({
				width: 50
			});
			node.maximumSize.update({
				width: 250
			});
			return node;
		};

		model

			//left panel
			.addModel(genNode2())

			//tab panel
			.addModel(
				new WorkspaceTabModel()
					.addModel(new DefaultWorkspacePanelModel('Tab 1'))
					.addModel(new DefaultWorkspacePanelModel('Tab 2'))
					.addModel(new DefaultWorkspacePanelModel('Tab 3'))
			)

			//tab panel
			.addModel(
				new WorkspaceTabModel()
					.addModel(new DefaultWorkspacePanelModel('Tab 4'))
					.addModel(new DefaultWorkspacePanelModel('Tab 5'))
					.addModel(new DefaultWorkspacePanelModel('Tab 6'))
			)

			.addModel(genNode2());
		return model;
	});
	return <CompInternal model={model} />;
};

export const Comp4 = () => {
	const engine = useEngine();
	const [model] = useState(() => {
		let model = new RootWorkspaceModel(engine);
		model.setHorizontal(true);
		model

			//left panel
			.addModel(genVerticalNode())

			//tab panel
			.addModel(
				new WorkspaceTabModel()
					.addModel(new DefaultWorkspacePanelModel('Tab 4'))
					.addModel(new DefaultWorkspacePanelModel('Tab 5'))
					.addModel(new DefaultWorkspacePanelModel('Tab 6'))
			)

			.addModel(genVerticalNode());

		const window1 = new FloatingWindowModel(new DefaultWorkspacePanelModel('Floating window 1'));
		window1.position.update({
			top: 100,
			left: 100
		});
		window1.setWidth(400);
		window1.setHeight(400);
		model.addFloatingWindow(window1);

		const window2 = new FloatingWindowModel(new DefaultWorkspacePanelModel('Floating window 2'));
		window2.position.update({
			top: 100,
			left: 600
		});
		window2.setWidth(400);
		window2.setHeight(400);
		model.addFloatingWindow(window2);

		return model;
	});

	useEffect(() => {
		draggingItemBehavior(engine);
		draggingItemDividerBehavior(engine);
		resizingBehavior(engine);
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
