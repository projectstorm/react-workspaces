import { DimensionContainer, Position, WorkspaceModel } from '@projectstorm/react-workspaces-core';

export class FloatingWindowModel extends WorkspaceModel {
	position: Position;
	dimension: DimensionContainer;

	static TYPE = 'floating-window';

	constructor(public child: WorkspaceModel) {
		super(FloatingWindowModel.TYPE);
		this.position = new Position();
		this.dimension = new DimensionContainer({
			position: this.position,
			size: this.size
		});
	}
}
