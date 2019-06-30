import { WorkspaceEngine } from './WorkspaceEngine';
import { WorkspaceFactory } from './WorkspaceFactory';
import { WorkspaceModel } from './models/WorkspaceModel';

export interface GenerateEvent<T extends WorkspaceModel> {
	engine: WorkspaceEngine;
	model: T;
}

export abstract class WorkspacePanelFactory<T extends WorkspaceModel = WorkspaceModel> extends WorkspaceFactory<T> {
	abstract generatePanelContent(event: GenerateEvent<T>): JSX.Element;

	abstract generatePanelTitle(event: GenerateEvent<T>): JSX.Element;

	abstract generateMicroButton(event: GenerateEvent<T> & { selected: boolean }): JSX.Element;

	abstract generatePanelTab(event: GenerateEvent<T> & { selected: boolean }): JSX.Element;
}
