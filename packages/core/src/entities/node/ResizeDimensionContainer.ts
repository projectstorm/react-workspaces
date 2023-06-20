import { DimensionContainer, DimensionContainerListener } from '../../core/dimensions/DimensionContainer';

export interface ResizeDimensionContainerListener extends DimensionContainerListener {
  hoverChanged: () => any;
  activeChanged: () => any;
}

export class ResizeDimensionContainer extends DimensionContainer<ResizeDimensionContainerListener> {
  hover: boolean;
  active: boolean;

  constructor() {
    super();
    this.hover = false;
    this.active = false;
  }

  setHover(hover: boolean) {
    if (this.hover === hover) {
      return;
    }
    this.hover = hover;
    this.iterateListeners((cb) => cb.hoverChanged?.());
  }

  setActive(active: boolean) {
    if (this.active === active) {
      return;
    }
    this.active = active;
    this.iterateListeners((cb) => cb.activeChanged?.());
  }
}
