import {WorkspacePanelModel} from "../models/WorkspacePanelModel";

export class DefaultWorkspacePanelModel extends WorkspacePanelModel{

	displayName: string;
	icon: string;
	getContent: () => any;

	constructor(displayName: string, getContent: () => any){
		super("default");
		this.displayName = displayName;
		this.getContent = getContent;
		this.icon = 'fa-cube';
	}
}
