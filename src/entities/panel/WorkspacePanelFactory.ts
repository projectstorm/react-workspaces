import {GenerateEvent, WorkspaceFactory} from '../../core/WorkspaceFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export interface GenerateMicroButtonEvent<T extends WorkspaceModel> extends GenerateEvent<T> {
	selected: boolean;
}

export interface GeneratePanelTabEvent<T extends WorkspaceModel> extends GenerateEvent<T> {
	selected: boolean;
}

export abstract class WorkspacePanelFactory<T extends WorkspaceModel = WorkspaceModel> extends WorkspaceFactory<T> {
	abstract generatePanelContent(event: GenerateEvent<T>): JSX.Element;

	abstract generatePanelTitle(event: GenerateEvent<T>): JSX.Element;

	abstract generateMicroButton(event: GenerateMicroButtonEvent<T>): JSX.Element;

	abstract generatePanelTab(event: GeneratePanelTabEvent<T>): JSX.Element;
}
