import * as React from 'react';
import { useEffect } from 'react';
import { Layer, useForceUpdate, WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { ResizeDividerWidget } from './ResizeDividerWidget';

export class ResizeDividersLayer extends Layer {
	constructor() {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <ResizeDividersLayerWidget engine={event.engine} />;
	}
}

export interface ResizeDividersLayerWidgetProps {
	engine: WorkspaceEngine;
}

export const ResizeDividersLayerWidget: React.FC<ResizeDividersLayerWidgetProps> = (props) => {
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
					return (
						<ResizeDividerWidget
							parent={m.before.parent as WorkspaceNodeModel}
							engine={props.engine}
							dividerContainer={m}
							key={m.dimensions.id}
						/>
					);
				})}
		</>
	);
};
