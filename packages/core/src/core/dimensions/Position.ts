import { Alignment, MousePosition } from '../tools';
import { BaseListener, BaseObserver } from '../BaseObserver';

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

  getRelativeToPosition(rect: IPosition): IPosition {
    return {
      top: this._top - rect.top,
      left: this._left - rect.left,
      right: this._right - rect.right,
      bottom: this._bottom - rect.bottom
    };
  }

  getRelativeToMousePosition(position: MousePosition): MousePosition {
    return {
      clientX: this._left - position.clientX,
      clientY: this._top - position.clientY
    };
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
