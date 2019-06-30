import { WorkspacePanelModel } from './models/WorkspacePanelModel';
import { WorkspaceEngine } from './WorkspaceEngine';

export interface GenerateEvent<T extends WorkspacePanelModel> {
	engine: WorkspaceEngine;
	model: T;
}

export abstract class WorkspacePanelFactory<T extends WorkspacePanelModel = WorkspacePanelModel> {
	type: string;

	constructor(type: string) {
		this.type = type;
	}

	abstract generatePanelContent(event: GenerateEvent<T>): JSX.Element;

	abstract generatePanelTitle(event: GenerateEvent<T>): JSX.Element;

	abstract generateMicroButton(event: GenerateEvent<T> & { selected: boolean }): JSX.Element;

	abstract generatePanelTab(event: GenerateEvent<T> & { selected: boolean }): JSX.Element;

	abstract generateModel(data: any): T;
}
