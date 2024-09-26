import { BaseListener, BaseObserver } from '../BaseObserver';

export interface SizeListener extends BaseListener {
  updated: (event: { prev: ISize }) => any;
}

export interface ISize {
  width: number;
  height: number;
}

export class Size extends BaseObserver<SizeListener> implements ISize {
  protected _width: number;
  protected _height: number;

  constructor() {
    super();
    this._width = 0;
    this._height = 0;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set width(width: number) {
    this.update({
      width
    });
  }

  valid() {
    return this.getVolume() > 0;
  }

  set height(height: number) {
    this.update({
      height
    });
  }

  get value() {
    return {
      width: this._width,
      height: this._height
    };
  }

  isPortrait() {
    return this.height > this.width;
  }

  getVolume() {
    return this.width * this.height;
  }

  trackSize(size: Size) {
    this.update(size.value);
    return size.registerListener({
      updated: () => {
        this.update(size.value);
      }
    });
  }

  update(size: Partial<ISize>) {
    let updated = false;
    let old: ISize = {
      width: this._width,
      height: this._height
    };
    if (size.width != null && size.width !== this.width) {
      this._width = size.width;
      updated = true;
    }
    if (size.height != null && size.height !== this.height) {
      this._height = size.height;
      updated = true;
    }
    if (updated) {
      this.iterateListeners((cb) =>
        cb.updated?.({
          prev: old
        })
      );
    }
  }
}
