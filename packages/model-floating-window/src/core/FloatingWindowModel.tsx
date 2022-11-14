import { DimensionContainer, Position, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';

export class FloatingWindowModel extends WorkspaceModel {
	position: Position;
	dimension: DimensionContainer;

	static TYPE = 'floating-window';
	private parentListener: () => any;

	constructor(public child: WorkspaceModel) {
		super(FloatingWindowModel.TYPE);
		this.position = new Position();
		this.dimension = new DimensionContainer({
			position: this.position,
			size: this.size
		});
		this.position.registerListener({
			updated: () => {
				this.normalizePosition();
			}
		});
	}

	setParent(parent: WorkspaceModel) {
		super.setParent(parent);
		if (parent) {
			this.parentListener = parent.r_dimensions.registerListener({
				updated: () => {
					this.normalizePosition();
				}
			});
		} else {
			this.parentListener?.();
		}
	}

	normalizePosition() {
		if (!this.parent) {
			return;
		}

		// cant do anything about this
		if (this.size.height > this.parent.r_dimensions.size.height) {
			return;
		}
		// cant do anything about this
		if (this.size.width > this.parent.r_dimensions.size.width) {
			return;
		}

		if (this.position.left < this.parent.r_dimensions.position.left) {
			this.position.update({
				left: 0
			});
		}
		if (this.position.top < this.parent.r_dimensions.position.top) {
			this.position.update({
				top: 0
			});
		}
		if (
			this.position.left + this.size.width >
			this.parent.r_dimensions.position.left + this.parent.r_dimensions.size.width
		) {
			this.position.update({
				left: this.parent.r_dimensions.position.left + this.parent.r_dimensions.size.width - this.size.width
			});
		}
		if (
			this.position.top + this.size.height >
			this.parent.r_dimensions.position.top + this.parent.r_dimensions.size.height
		) {
			this.position.update({
				top: this.parent.r_dimensions.position.top + this.parent.r_dimensions.size.height - this.size.height
			});
		}
	}
}
