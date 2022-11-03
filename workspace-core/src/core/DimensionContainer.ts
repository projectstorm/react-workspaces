import { BaseListener, BaseObserver } from './BaseObserver';
import * as _ from 'lodash';
import { Alignment } from './tools';
import { v4 } from 'uuid';

export interface DimensionContainerListener extends BaseListener {
	updated: () => any;
	invalidate: () => any;
}

export interface RawPosition {
	[Alignment.TOP]: number;
	[Alignment.LEFT]: number;
	[Alignment.BOTTOM]: number;
	[Alignment.RIGHT]: number;
}

export interface RawDimensions {
	width: number;
	height: number;
}

export type Dimension = RawPosition & RawDimensions;

export class DimensionContainer extends BaseObserver<DimensionContainerListener> {
	dimensions: Dimension;
	id: string;

	constructor() {
		super();
		this.id = v4();
		this.dimensions = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
	}

	isPortrait() {
		return this.dimensions.height > this.dimensions.width;
	}

	invalidate() {
		this.iterateListeners((cb) => cb.invalidate?.());
	}

	update(dim: Partial<Dimension>) {
		let dirty = false;
		for (let i in dim) {
			if (this.dimensions[i] !== dim[i]) {
				this.dimensions[i] = dim[i];
				dirty = true;
			}
		}
		if (dirty) {
			this.iterateListeners((cb) => cb.updated?.());
		}
	}

	getRelativePosition(rect: RawPosition): RawPosition {
		return {
			top: rect.top - this.dimensions.top,
			left: rect.left - this.dimensions.left,
			right: rect.right - this.dimensions.right,
			bottom: rect.bottom - this.dimensions.bottom
		};
	}

	getRelativeMousePosition(position: { clientX: number; clientY: number }): { clientX: number; clientY: number } {
		return {
			clientX: position.clientX - this.dimensions.left,
			clientY: position.clientY - this.dimensions.top
		};
	}

	getRelativeElementPosition(element: HTMLElement): RawPosition {
		let rect = element.getBoundingClientRect();
		return this.getRelativePosition(_.pick(rect, ['top', 'left', 'bottom', 'right']));
	}

	isRight(element: HTMLDivElement) {
		return this.getRelativeElementPosition(element).left > this.dimensions.width / 2;
	}
}
