import {
  ResizeDivision,
  WorkspaceNodeModel,
  WorkspaceNodeModelListener,
  WorkspaceNodeModelSerialized
} from './WorkspaceNodeModel';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as _ from 'lodash';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface ExpandNodeModelSerialized extends WorkspaceNodeModelSerialized {
  computed_initial?: boolean;
}

export interface ExpandNodeModelListener extends WorkspaceNodeModelListener {
  recomputed?: () => any;
}

/**
 * This is a smarter version of the standard Node model which can work with
 * panels that expand, and treats them like standard panels, allowing them to resize
 *
 * The magic happens in the getPanelDirective() method, which tells child to behave slightly differently.
 * This means for example, we can cause the last panel in a set to expand, even if none of the children actually
 * want to expand (expandHorizontal/Vertical == false)
 */
export class ExpandNodeModel<
  S extends ExpandNodeModelSerialized = ExpandNodeModelSerialized,
  L extends ExpandNodeModelListener = ExpandNodeModelListener
> extends WorkspaceNodeModel<S, L> {
  busy: boolean;
  computed_initial: boolean;

  constructor() {
    super();
    this.busy = false;
    this.computed_initial = false;
  }

  addModel(model: WorkspaceModel, position: number = null): this {
    super.addModel(model, position);
    this.recomputeSizes();
    return this;
  }

  toArray(): S {
    return {
      ...super.toArray(),
      computed_initial: this.computed_initial
    };
  }

  fromArray(payload: S, engine: WorkspaceEngine) {
    this.computed_initial = payload.computed_initial ?? false;
    // we disable re-computation since the panels should have their correct sizes already
    if (this.computed_initial) {
      this.busy = true;
    }
    super.fromArray(payload, engine);
    this.busy = false;
  }

  async recomputeSizes() {
    if (this.busy) {
      return;
    }
    this.busy = true;
    let length = await this.r_dimensions.waitForSize().then((size) => (this.vertical ? size.height : size.width));
    const expand = this.getExpandNodes();
    if (expand.length <= 1) {
      this.busy = false;
      this.computed_initial = true;
      this.iterateListeners((cb) => cb.recomputed?.());
      return;
    }
    length = this.vertical ? this.r_dimensions.size.height : this.r_dimensions.size.width;

    let static_lengths = await Promise.all(
      this.children
        .filter((c) => !expand.includes(c))
        .map((d) => {
          return d.r_dimensions.waitForSize().then((size) => (this.vertical ? size.height : size.width));
        })
    );

    const static_length = _.sum(
      this.r_divisions.map((d) => (this.vertical ? d.size.height : d.size.width)).concat(static_lengths)
    );

    if (length > static_length) {
      let res = Math.round((length - static_length) / expand.length);
      for (let i = 0; i < expand.length - 1; i++) {
        if (this.vertical) {
          expand[i].setHeight(res);
        } else {
          expand[i].setWidth(res);
        }
      }
    }
    this.busy = false;
    this.computed_initial = true;

    this.iterateListeners((cb) => cb.recomputed?.());
  }

  getResizeDivisions(): ResizeDivision[] {
    let divs: ResizeDivision[] = [];
    for (let i = 1; i < this.r_divisions.length - 1; i++) {
      divs.push({
        before: this.children[i - 1],
        after: this.children[i],
        dimensions: this.r_divisions[i],
        vertical: !this.vertical
      });
    }
    return divs;
  }

  getExpandNodes() {
    return this.children.filter((c) => {
      return this.vertical ? c.expandVertical : c.expandHorizontal;
    });
  }

  shouldChildExpand(child: WorkspaceModel): boolean {
    const expandNodes = this.getExpandNodes();

    //no expand nodes, so treat the last one as the expand node
    if (expandNodes.length === 0 && this.children.indexOf(child) === this.children.length - 1) {
      return true;
    }

    // only expand the last one if there are multiple
    if (expandNodes.length > 1) {
      return expandNodes.indexOf(child) === expandNodes.length - 1;
    }

    return super.shouldChildExpand(child);
  }
}
