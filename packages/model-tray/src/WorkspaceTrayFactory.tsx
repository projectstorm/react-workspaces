import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { GenerateEvent, WorkspaceModelFactory } from '@projectstorm/react-workspaces-core';

export class WorkspaceTrayFactory<T extends WorkspaceTrayModel = WorkspaceTrayModel> extends WorkspaceModelFactory<T> {
	constructor() {
		super(WorkspaceTrayModel.NAME);
	}

	generateModel(): T {
		return new WorkspaceTrayModel() as T;
	}

	generateTrayHeader(event: GenerateEvent<T>) {
		return null;
	}

	generateContent(event: GenerateEvent<T>): JSX.Element {
		return (
			<TrayWidget
				header={this.generateTrayHeader(event)}
				key={event.model.id}
				node={event.model}
				engine={event.engine}
			/>
		);
	}
}
