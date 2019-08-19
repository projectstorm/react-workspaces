import { WorkspaceModel } from '../../src/core-models/WorkspaceModel';
import { WorkspaceEngine } from '../../src/core/WorkspaceEngine';
import { IconName } from '@fortawesome/free-solid-svg-icons';

export class DefaultWorkspacePanelModel extends WorkspaceModel {
	displayName: string;
	icon: IconName;

	constructor(displayName: string, icon: IconName = 'cube') {
		super('default');
		this.displayName = displayName;
		this.icon = icon;
		this.setExpand(false, true);
	}

	toArray() {
		return {
			...super.toArray(),
			displayName: this.displayName,
			icon: this.icon
		};
	}

	fromArray(payload: any, engine: WorkspaceEngine) {
		super.fromArray(payload, engine);
		this.displayName = payload['displayName'];
		this.icon = payload['icon'];
	}
}
