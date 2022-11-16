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
	DefaultSubComponentRenderer,
	DefaultTrayFactory,
	DefaultWorkspacePanelFactory,
	DefaultWorkspacePanelModel,
	DefaultWindowModelFactory
} from '@projectstorm/react-workspaces-defaults';
import { draggingItemBehavior } from '@projectstorm/react-workspaces-behavior-panel-dropzone';
import { draggingItemDividerBehavior } from '@projectstorm/react-workspaces-behavior-divider-dropzone';
import { WorkspaceTabFactory } from '@projectstorm/react-workspaces-model-tabs';
import { resizingBehavior } from '@projectstorm/react-workspaces-behavior-resize';

export const genVerticalNode = () => {
	const node = new WorkspaceNodeModel()
		.setExpand(false)
		.setVertical(true)
		.addModel(new DefaultWorkspacePanelModel('Panel 1').setExpand(false, false))
		.addModel(new DefaultWorkspacePanelModel('Panel 2'));
	return node;
};

export const useEngine = (args: { DebugDividers?: boolean; DebugResizers?: boolean; DebugPanels?: boolean } = {}) => {
	const [debugLayer] = useState(() => {
		return new DebugLayer({
			dividers: args.DebugDividers,
			resizeDividers: args.DebugResizers,
			panels: args.DebugPanels
		});
	});
	const [engine] = useState(() => {
		const e = new WorkspaceEngine();

		const commonRenderer = new DefaultSubComponentRenderer();

		const windowFactory = new DefaultWindowModelFactory();
		const tabFactory = new WorkspaceTabFactory();
		const trayFactory = new DefaultTrayFactory({
			windowFactory: windowFactory
		});
		const workspaceNodeFactory = new WorkspaceNodeFactory();

		e.registerFactory(new DefaultWorkspacePanelFactory());

		tabFactory.addRenderer(commonRenderer);
		trayFactory.addRenderer(commonRenderer);
		workspaceNodeFactory.addRenderer(commonRenderer);

		e.registerFactory(tabFactory);
		e.registerFactory(trayFactory);
		e.registerFactory(workspaceNodeFactory);
		e.registerFactory(windowFactory);

		draggingItemBehavior(e);
		draggingItemDividerBehavior(e);
		resizingBehavior(e);

		e.layerManager.addLayer(debugLayer);
		return e;
	});
	useEffect(() => {
		debugLayer.updateOptions({
			dividers: args.DebugDividers,
			resizeDividers: args.DebugResizers,
			panels: args.DebugPanels
		});
	}, [args.DebugDividers, args.DebugResizers, args.DebugPanels]);
	return engine;
};

export const CompInternal: React.FC<{ model: WorkspaceNodeModel; engine: WorkspaceEngine }> = (props) => {
	return (
		<S.Container>
			<WorkspaceWidget
				engine={props.engine}
				model={props.model}
				dividerColor="rgb(0,192,255)"
				dividerColorActive="rgb(192,255,0)"
			/>
		</S.Container>
	);
};

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
