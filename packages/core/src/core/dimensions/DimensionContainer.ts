import { v4 } from 'uuid';
import * as _ from 'lodash';
import { ISize, Size } from './Size';
import { IPosition, Position } from './Position';
import { BaseListener, BaseObserver } from '../BaseObserver';
import { MousePosition } from '../tools';

export interface DimensionContainerListener extends BaseListener {
	updated: () => any;
	invalidate: () => any;
}

export type IDimension = IPosition & ISize;

export interface DimensionContainerOptions {
	position?: Position;
	size?: Size;
}

export class DimensionContainer extends BaseObserver<DimensionContainerListener> {
	position: Position;
	size: Size;
	id: string;

	constructor(options: DimensionContainerOptions = {}) {
		super();
		this.id = v4();
		this.size = options.size || new Size();
		this.position = options.position || new Position();
		this.size.registerListener({
			updated: () => {
				this.fireUpdated();
			}
		});
		this.position.registerListener({
			updated: () => {
				this.fireUpdated();
			}
		});
	}

	protected fireUpdated = _.debounce(() => {
		this.iterateListeners((cb) => cb.updated?.());
	}, 0);

	get dimensions(): IDimension {
		return {
			top: this.position.top,
			left: this.position.left,
			bottom: this.position.bottom,
			right: this.position.right,
			width: this.size.width,
			height: this.size.height
		};
	}

	isPortrait() {
		return this.size.isPortrait();
	}

	getVolume() {
		return this.size.getVolume();
	}

	invalidate() {
		this.iterateListeners((cb) => cb.invalidate?.());
	}

	update(dim: Partial<IDimension>) {
		this.size.update(dim);
		this.position.update(dim);
	}

	getRelativePosition(rect: IPosition) {
		return this.position.getRelativePosition(rect);
	}

	getRelativeMousePosition(position: MousePosition) {
		return this.position.getRelativeMousePosition(position);
	}

	getRelativeElementPosition(element: HTMLElement) {
		return this.position.getRelativeElementPosition(element);
	}

	isRight(element: HTMLDivElement) {
		return this.getRelativeElementPosition(element).left > this.dimensions.width / 2;
	}
}
