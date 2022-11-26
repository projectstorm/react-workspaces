import { DirectionLayoutChildDirective } from '../../widgets/layouts/DirectionalChildWidget';
import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';

export class ExpandNodeModel extends WorkspaceNodeModel {
	getPanelDirective(child: WorkspaceModel): DirectionLayoutChildDirective {
		const hasExpandNode = this.children.some((c) => {
			return this.vertical ? c.expandVertical : c.expandHorizontal;
		});

		if (!hasExpandNode && this.children.indexOf(child) === this.children.length - 1) {
			return {
				...super.getPanelDirective(child),
				expand: true
			};
		}

		return super.getPanelDirective(child);
	}
}
