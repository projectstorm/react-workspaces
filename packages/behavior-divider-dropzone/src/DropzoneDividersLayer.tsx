import * as React from 'react';
import { useEffect } from 'react';
import {
	Layer,
	useForceUpdate,
	WorkspaceEngine,
	WorkspaceModel,
	WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';
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
		return props.engine.registerListener({
			layoutInvalidated: () => {
				forceUpdate();
			}
		});
	}, []);

	return (
		<>
			{props.engine.rootModel
				.flatten()
				.filter((p) => p instanceof WorkspaceNodeModel)
				.flatMap((m: WorkspaceNodeModel) => {
					return m.r_divisons.map((division, index) => {
						return (
							<DropzoneDividerWidget
								engine={props.engine}
								dimension={division}
								key={m.id}
								handleDrop={(model) => {
									m.addModel(model, index);
								}}
							/>
						);
					});
				})}
		</>
	);
};
