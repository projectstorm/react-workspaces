import * as React from 'react';
import { WorkspaceNodeModel } from './models/node/WorkspaceNodeModel';
import { DragEvent } from 'react';
import { WorkspaceFactory } from './WorkspaceFactory';
import { WorkspaceModel } from './models/WorkspaceModel';
import { WorkspaceNodeFactory } from './models/node/WorkspaceNodeFactory';
import { WorkspaceTabbedFactory } from './models/tabs/WorkspaceTabbedFactory';
import { WorkspaceEngineInterface } from './WorkspaceEngineInterface';
import { uuid } from './tools';

export interface WorkspaceEngineListener {
	repaint?: () => any;
	draggingElement?: (model: WorkspaceModel, dragging: boolean) => any;
	generateTrayHeader?: (model: WorkspaceNodeModel) => JSX.Element;
	modelUpdated?: () => any;
}

export class WorkspaceEngine implements WorkspaceEngineInterface {
	factories: { [type: string]: WorkspaceFactory };
	listeners: { [id: string]: WorkspaceEngineListener };
	draggingID: string;
	fullscreenModel: WorkspaceModel;
	fireModelUpdateEvent: boolean;

	constructor() {
		this.factories = {};
		this.listeners = {};
		this.draggingID = null;
		this.fullscreenModel = null;
		this.registerFactory(new WorkspaceNodeFactory());
		this.registerFactory(new WorkspaceTabbedFactory());
	}

	setFullscreenModel(model: WorkspaceModel | null) {
		this.fullscreenModel = model;
		this.fireRepaintListeners();
	}

	registerListener(listener: WorkspaceEngineListener): () => any {
		let id = uuid();
		this.listeners[id] = listener;
		return () => {
			delete this.listeners[id];
		};
	}

	static namespaceMime(data: string) {
		return `srw/${data}`;
	}

	fireModelUpdated() {
		this.fireModelUpdateEvent = true;
	}

	_fireModelUpdated() {
		this.fireModelUpdateEvent = false;
		this.itterateListeners(listener => {
			listener.modelUpdated && listener.modelUpdated();
		});
	}

	itterateListeners(cb: (listener: WorkspaceEngineListener) => any) {
		for (let i in this.listeners) {
			cb(this.listeners[i]);
		}
	}

	getTrayHeader(model: WorkspaceNodeModel): JSX.Element {
		for (let i in this.listeners) {
			if (this.listeners[i].generateTrayHeader) {
				let element = this.listeners[i].generateTrayHeader(model);
				if (element) {
					return element;
				}
			}
		}
		return null;
	}

	getDropEventModelID(event: DragEvent): string {
		for (var i = 0; i < event.dataTransfer.types.length; ++i) {
			const mime = event.dataTransfer.types[i];
			if (mime.startsWith('srw/id/')) {
				return mime.substr('srw/id/'.length);
			}
		}
	}

	fireRepaintListeners() {
		this.itterateListeners(list => {
			list.repaint && list.repaint();
		});
	}

	registerFactory(factory: WorkspaceFactory) {
		this.factories[factory.type] = factory;
	}

	getFactory<T extends WorkspaceFactory>(model: WorkspaceModel | string): T {
		if (typeof model !== 'string') {
			model = model.type;
		}
		if (!this.factories[model]) {
			throw 'Cannot find Workspace factory for model with type: [' + model + ']';
		}
		return this.factories[model] as T;
	}

	setDraggingNode(id: string) {
		if (this.draggingID !== id) {
			this.draggingID = id;
			this.fireRepaintListeners();
		} else if (id === null) {
			this.fireRepaintListeners();
		}
	}
}
