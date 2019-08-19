import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import { WorkspaceLayoutFactory } from '../../core/WorkspaceLayoutFactory';
import * as React from 'react';
import { GenerateEvent } from '../../core/WorkspaceFactory';
import { TrayWidget } from './TrayWidget';

export class WorkspaceTrayFactory<T extends WorkspaceNodeModel = WorkspaceNodeModel> extends WorkspaceLayoutFactory<T> {
	constructor() {
		super(WorkspaceNodeModel.NAME);
	}

	generateModel(): T {
		return new WorkspaceNodeModel() as T;
	}

	generateTrayHeader(event: GenerateEvent<T>) {
		return null;
	}

	generateLayout(event: GenerateEvent<T>): JSX.Element {
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
