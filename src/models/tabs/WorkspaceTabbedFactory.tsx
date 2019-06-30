import { WorkspaceFactory } from '../../WorkspaceFactory';
import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';

export class WorkspaceTabbedFactory extends WorkspaceFactory<WorkspaceTabbedModel> {
	constructor() {
		super(WorkspaceTabbedModel.NAME);
	}

	generateModel(): WorkspaceTabbedModel {
		return new WorkspaceTabbedModel();
	}
}
