import {AbstractWorkspaceModel} from "./AbstractWorkspaceModel";

export class WorkspacePanelModel extends AbstractWorkspaceModel{

	factory: string;

	constructor(factory: string){
		super();
		this.factory = factory;
	}
}
