import * as React from 'react';
import { useEffect } from 'react';
import { Layer, useForceUpdate, WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { ResizeDividerWidget } from './ResizeDividerWidget';

export class ResizeDividersLayer extends Layer {
	constructor(p) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <ResizeDividersLayerWidget engine={event.engine} />;
	}
}

export interface ResizeDividersLayerrWidgetProps {
	engine: WorkspaceEngine;
}

export const ResizeDividersLayerWidget: React.FC<ResizeDividersLayerrWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate(true);

	// TODO rerun this when models added
	useEffect(() => {
		const listeners = props.engine.rootModel.flatten().map((m) =>
			m.registerListener({
				visibilityChanged: () => {
					forceUpdate();
				}
			})
		);
		return () => {
			listeners.forEach((l) => l());
		};
	}, []);

	return (
		<>
			{props.engine.rootModel
				.flatten()
				.filter((p) => p instanceof WorkspaceNodeModel)
				.flatMap((m: WorkspaceNodeModel) => m.getResizeDivisions())
				.map((m) => {
					return <ResizeDividerWidget engine={props.engine} dividerContainer={m} key={m.dimensions.id} />;
				})}
		</>
	);
};
