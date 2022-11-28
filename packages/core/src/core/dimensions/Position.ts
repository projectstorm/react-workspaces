import { Alignment, MousePosition } from '../tools';
import { BaseListener, BaseObserver } from '../BaseObserver';
import * as _ from 'lodash';

export interface PositionListener extends BaseListener {
  updated: () => any;
}

export interface IPosition {
  [Alignment.TOP]: number;
  [Alignment.LEFT]: number;
  [Alignment.BOTTOM]: number;
  [Alignment.RIGHT]: number;
}

export class Position extends BaseObserver<PositionListener> implements IPosition {
  protected _top: number;
  protected _left: number;
  protected _bottom: number;
  protected _right: number;

  constructor() {
    super();
    this._top = 0;
    this._left = 0;
    this._bottom = 0;
    this._right = 0;
  }

  get top() {
    return this._top;
  }

  get left() {
    return this._left;
  }

  get bottom() {
    return this._bottom;
  }

  get right() {
    return this._right;
  }

  getRelativePosition(rect: IPosition): IPosition {
    return {
      top: rect.top - this._top,
      left: rect.left - this._left,
      right: rect.right - this._right,
      bottom: rect.bottom - this._bottom
    };
  }

  getRelativeMousePosition(position: MousePosition): MousePosition {
    return {
      clientX: position.clientX - this._left,
      clientY: position.clientY - this._top
    };
  }

  getRelativeElementPosition(element: HTMLElement): IPosition {
    let rect = element.getBoundingClientRect();
    return this.getRelativePosition(_.pick(rect, _.values(Alignment)));
  }

  update(position: Partial<IPosition>) {
    let updated = false;
    if (position[Alignment.TOP] != null && position[Alignment.TOP] !== this._top) {
      this._top = position[Alignment.TOP];
      updated = true;
    }
    if (position[Alignment.LEFT] != null && position[Alignment.LEFT] !== this._left) {
      this._left = position[Alignment.LEFT];
      updated = true;
    }
    if (position[Alignment.BOTTOM] != null && position[Alignment.BOTTOM] !== this._bottom) {
      this._bottom = position[Alignment.BOTTOM];
      updated = true;
    }
    if (position[Alignment.RIGHT] != null && position[Alignment.RIGHT] !== this._right) {
      this._right = position[Alignment.RIGHT];
      updated = true;
    }

    if (updated) {
      this.iterateListeners((cb) => cb.updated?.());
    }
  }
}
