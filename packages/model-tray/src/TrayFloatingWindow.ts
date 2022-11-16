import { FloatingWindowModel } from '@projectstorm/react-workspaces-model-floating-window';
import { WorkspaceModel } from '@projectstorm/react-workspaces-core';

export class TrayFloatingWindow extends FloatingWindowModel {
	private childListener: () => any;

	constructor() {
		super(null);
	}

	updatePosition() {
		this.position.update({
			left: -this.size.width + this.child.r_dimensions.position.right - this.child.r_dimensions.size.width,
			top: this.child.r_dimensions.position.top
		});
	}

	setChild(model: WorkspaceModel) {
		super.setChild(model);
		this.minimumSize.update({
			width: 100,
			height: 100
		});
		this.updatePosition();
		this.childListener?.();
		this.childListener = model.r_dimensions.registerListener({
			updated: () => {
				this.updatePosition();
			}
		});
	}

	dispose() {
		this.childListener?.();
	}
}
