import { v4 } from 'uuid';
import { ISize, Size } from './Size';
import { IPosition, Position } from './Position';
import { BaseListener, BaseObserver } from '../BaseObserver';
import { Alignment, MousePosition } from '../tools';

export interface DimensionContainerListener extends BaseListener {
  updated: () => any;
  invalidate: (immediate?: boolean) => any;
}

export type IDimension = IPosition & ISize;

export interface DimensionContainerOptions {
  position?: Position;
  size?: Size;
}

export class DimensionContainer<
  L extends DimensionContainerListener = DimensionContainerListener
> extends BaseObserver<L> {
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

  async waitForSize() {
    if (this.size.getVolume() == 0) {
      await new Promise<void>((resolve) => {
        const l1 = this.registerListener({
          updated: () => {
            if (this.size.getVolume() > 0) {
              l1();
              resolve();
            }
          }
        } as L);
      });
    }
    return this.size;
  }

  protected fireUpdated = () => {
    this.iterateListeners((cb) => cb.updated?.());
  };

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

  invalidate(immediate?: boolean) {
    this.iterateListeners((cb) => cb.invalidate?.(immediate));
  }

  update(dim: Partial<IDimension>) {
    this.size.update(dim);
    this.position.update(dim);
  }

  getRelativeToPosition(rect: IPosition) {
    return this.position.getRelativeToPosition(rect);
  }

  getRelativeToMousePosition(position: MousePosition) {
    return this.position.getRelativeToMousePosition(position);
  }

  isAligned(parent: DimensionContainer, alignment: Alignment) {
    const rel = this.getRelativeToPosition(parent.position)[alignment];
    if (alignment === Alignment.LEFT) {
      return rel <= parent.dimensions.width / 2;
    }
    if (alignment === Alignment.RIGHT) {
      return rel > parent.dimensions.width / 2;
    }
    if (alignment === Alignment.TOP) {
      return rel <= parent.dimensions.height / 2;
    }
    if (alignment === Alignment.BOTTOM) {
      return rel > parent.dimensions.height / 2;
    }
  }
}
