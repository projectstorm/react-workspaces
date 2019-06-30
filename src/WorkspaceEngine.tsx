import * as React from 'react';
import { WorkspacePanelFactory } from './WorkspacePanelFactory';
import { WorkspacePanelModel } from './models/WorkspacePanelModel';
import { WorkspaceNodeModel } from './models/WorkspaceNodeModel';
import { DragEvent } from 'react';

export interface WorkspaceEngineListener {
	repaint?: () => any;
	generateTrayHeader?: (model: WorkspaceNodeModel) => JSX.Element;
}

export class WorkspaceEngine {
	factories: { [type: string]: WorkspacePanelFactory };
	listeners: { [id: string]: WorkspaceEngineListener };
	draggingID: string;
	fullscreenModel: WorkspacePanelModel;

	constructor() {
		this.factories = {};
		this.listeners = {};
		this.draggingID = null;
		this.fullscreenModel = null;
	}

	setFullscreenModel(model: WorkspacePanelModel | null) {
		this.fullscreenModel = model;
		this.fireRepaintListeners();
	}

	registerListener(listener: WorkspaceEngineListener): () => any {
		let id = WorkspaceEngine.generateID();
		this.listeners[id] = listener;
		return () => {
			delete this.listeners[id];
		};
	}

	static namespaceMime(data: string) {
		return `srw/${data}`;
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
		for (let i in this.listeners) {
			this.listeners[i].repaint && this.listeners[i].repaint();
		}
	}

	registerFactory(factory: WorkspacePanelFactory) {
		this.factories[factory.type] = factory;
	}

	getFactory(model: WorkspacePanelModel | string): WorkspacePanelFactory {
		if (typeof model !== 'string') {
			model = model.type;
		}
		if (!this.factories[model]) {
			throw 'Cannot find Workspace factory for model with type: [' + model + ']';
		}
		return this.factories[model];
	}

	setDraggingNode(id: string) {
		if (this.draggingID !== id) {
			this.draggingID = id;
			this.fireRepaintListeners();
		}
	}

	static generateID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
}
