import {WorkspacePanelModel} from "../../src/models/WorkspacePanelModel";

export class DefaultWorkspacePanelModel extends WorkspacePanelModel{

	displayName: string;
	icon: string;

	constructor(displayName: string, icon = 'fa-cube'){
		super("default");
		this.displayName = displayName;
		this.icon = icon;
	}

	toArray(){
		return {
			...super.toArray(),
			displayName: this.displayName,
			icon: this.icon
		}
	}

	fromArray(payload: any) {
		super.fromArray(payload);
		this.displayName = payload['displayName'];
		this.icon = payload['icon'];
	}

}
