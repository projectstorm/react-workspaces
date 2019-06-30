import { AbstractWorkspaceModel } from './AbstractWorkspaceModel';

export class WorkspacePanelModel extends AbstractWorkspaceModel {
	type: string;

	constructor(type: string) {
		super();
		this.type = type;
	}

	toArray() {
		return {
			...super.toArray(),
			type: this.type
		};
	}
}
