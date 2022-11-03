import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import * as React from 'react';
import { RenderContentEvent, WorkspaceModelFactory } from '../../core/WorkspaceModelFactory';
import { StandardLayoutWidget } from '../../widgets/layouts/StandardLayoutWidget';

namespace S {}

export class WorkspaceNodeFactory<T extends WorkspaceNodeModel = WorkspaceNodeModel> extends WorkspaceModelFactory<T> {
	constructor() {
		super(WorkspaceNodeModel.NAME);
	}

	generateModel(): T {
		return new WorkspaceNodeModel() as T;
	}

	generateContent(event: RenderContentEvent<T>): JSX.Element {
		return <StandardLayoutWidget key={event.model.id} node={event.model} engine={event.engine} />;
	}
}
