import { WorkspaceFactory } from '../../WorkspaceFactory';
import { WorkspaceNodeModel } from './WorkspaceNodeModel';

export class WorkspaceNodeFactory extends WorkspaceFactory<WorkspaceNodeModel> {
	constructor() {
		super(WorkspaceNodeModel.NAME);
	}

	generateModel(): WorkspaceNodeModel {
		return new WorkspaceNodeModel();
	}
}
