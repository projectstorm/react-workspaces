import * as React from 'react';
import { useEffect } from 'react';
import { Layer, useForceUpdate, WorkspaceEngine, WorkspaceNodeModel } from '@projectstorm/react-workspaces-core';
import { DropzoneDividerWidget } from './DropzoneDividerWidget';

export class DropzoneDividersLayer extends Layer {
	constructor(public modelID: string) {
		super({
			mouseEvents: false
		});
	}

	renderLayer(event): JSX.Element {
		return <DropzoneDividersLayerWidget engine={event.engine} />;
	}
}

export interface DropzoneDividersLayerWidgetProps {
	engine: WorkspaceEngine;
}

export const DropzoneDividersLayerWidget: React.FC<DropzoneDividersLayerWidgetProps> = (props) => {
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
				.flatMap((m: WorkspaceNodeModel) => m.r_divisons)
				.map((m) => {
					return <DropzoneDividerWidget engine={props.engine} dimension={m} key={m.id} />;
				})}
		</>
	);
};
