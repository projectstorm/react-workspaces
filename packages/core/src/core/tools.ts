import { WorkspaceModel } from '../core-models/WorkspaceModel';
import { WorkspaceCollectionModel } from '../core-models/WorkspaceCollectionModel';
import { v4 } from 'uuid';

export const regenerateIDs = (model: WorkspaceModel) => {
	if (model instanceof WorkspaceCollectionModel) {
		model.children.forEach((m) => regenerateIDs(m));
	}
	model.id = v4();
};

export interface MousePosition {
	clientX: number;
	clientY: number;
}

export enum Alignment {
	TOP = 'top',
	LEFT = 'left',
	BOTTOM = 'bottom',
	RIGHT = 'right'
}

export const log = (...args) => {
	console.debug(`[SRW] `, ...args);
};
