import * as React from 'react';
import { GenerateEvent, RenderContentEvent, WorkspaceModelFactory } from '../../core/WorkspaceModelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { PanelWidget } from './PanelWidget';

export interface GenerateMicroButtonEvent<T extends WorkspaceModel> extends GenerateEvent<T> {
	selected: boolean;
}

export interface GeneratePanelTabEvent<T extends WorkspaceModel> extends GenerateEvent<T> {
	selected: boolean;
}

export abstract class WorkspacePanelFactory<
	T extends WorkspaceModel = WorkspaceModel
> extends WorkspaceModelFactory<T> {
	generateContent(event: RenderContentEvent<T>): JSX.Element {
		if (event.renderContentOnly) {
			return this.generatePanelContent(event);
		}
		return <PanelWidget model={event.model} engine={event.engine} expand={true} />;
	}

	abstract generatePanelContent(event: GenerateEvent<T>): JSX.Element;

	abstract generatePanelTitle(event: GenerateEvent<T>): JSX.Element;

	abstract generateMicroButton(event: GenerateMicroButtonEvent<T>): JSX.Element;

	abstract generatePanelTab(event: GeneratePanelTabEvent<T>): JSX.Element;
}
