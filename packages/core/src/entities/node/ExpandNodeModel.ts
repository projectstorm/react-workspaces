import { DirectionLayoutChildDirective } from '../../widgets/layouts/DirectionalChildWidget';
import { ResizeDivision, WorkspaceNodeModel } from './WorkspaceNodeModel';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as _ from 'lodash';

export interface ExpandNodeModelChild {
	originalWidth: number;
	originalHeight: number;
}

/**
 * This is a smarter version of the standard Node model which can work with
 * panels that expand, and treats them like standard panels, allowing them to resize
 */
export class ExpandNodeModel extends WorkspaceNodeModel {
	dimensions: Map<WorkspaceModel, ExpandNodeModelChild>;

	constructor() {
		super();
		this.dimensions = new Map();
		this.r_dimensions.size.registerListener({
			updated: () => {
				if (this.dimensions.size > 1) {
					for (let [model, directive] of this.dimensions.entries()) {
					}
				}
			}
		});
	}

	addModel(model: WorkspaceModel, position: number = null): this {
		super.addModel(model, position);
		if ((this.vertical && model.expandVertical) || (!this.vertical && model.expandHorizontal)) {
			this.dimensions.set(model, {
				originalWidth: model.size.width,
				originalHeight: model.size.height
			});
			const listener = model.registerListener({
				removed: () => {
					listener?.();
					model.setSize({
						width: this.dimensions.get(model).originalWidth,
						height: this.dimensions.get(model).originalHeight
					});
					this.dimensions.delete(model);
					this.recomputeSizes();
				}
			});
			this.recomputeSizes();
		}
		return this;
	}

	recomputeSizes() {
		const dims = Array.from(this.dimensions.keys());
		for (let i = 0; i < dims.length - 1; i++) {
			if (this.vertical && dims[i].size.height === 0) {
				dims[i].setHeight(200);
			} else if (!this.vertical && dims[i].size.width === 0) {
				dims[i].setWidth(200);
			}
		}
	}

	getResizeDivisions(): ResizeDivision[] {
		let divs: ResizeDivision[] = [];
		for (let i = 1; i < this.r_divisons.length - 1; i++) {
			divs.push({
				before: this.children[i - 1],
				after: this.children[i],
				dimensions: this.r_divisons[i],
				vertical: !this.vertical
			});
		}
		return divs;
	}

	getPanelDirective(child: WorkspaceModel): DirectionLayoutChildDirective {
		//no expand nodes, so treat the last one as the expand node
		if (this.dimensions.size === 0 && this.children.indexOf(child) === this.children.length - 1) {
			return {
				...super.getPanelDirective(child),
				expand: true
			};
		} else if (
			this.dimensions.size > 1 &&
			Array.from(this.dimensions.keys()).indexOf(child) < this.dimensions.size - 1
		) {
			return {
				...super.getPanelDirective(child),
				expand: false
			};
		}

		return super.getPanelDirective(child);
	}
}
