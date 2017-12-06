import {WorkspacePanelModel} from "./models/WorkspacePanelModel";

export abstract class WorkspacePanelFactory<T extends WorkspacePanelModel = WorkspacePanelModel>{

	type: string;

	constructor(type: string){
		this.type = type;
	}

	abstract generatePanelContent(model: T): JSX.Element;

	abstract generatePanelTitle(model: T): JSX.Element;

	abstract generateMicroButton(model: T, selected: boolean): JSX.Element;

	abstract generatePanelTab(model: T, selected: boolean): JSX.Element;
}
