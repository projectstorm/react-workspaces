import {WorkspacePanelFactory} from "./WorkspacePanelFactory";
import {WorkspacePanelModel} from "./models/WorkspacePanelModel";
import {AbstractWorkspaceModel} from "./models/AbstractWorkspaceModel";

export class WorkspaceEngine {

	factories: { [type: string]: WorkspacePanelFactory };
	listeners: {[id: string]: () => any};
	draggingNode: AbstractWorkspaceModel;
	fullscreenModel: WorkspacePanelModel;

	constructor() {
		this.factories = {};
		this.listeners = {};
		this.draggingNode = null;
		this.fullscreenModel = null;
	}

	setFullscreenModel(model: WorkspacePanelModel | null) {
		this.fullscreenModel = model;
		this.fireRepaintListeners();
	}

	registerRepaintListener(listener: () => any): string{
		let id = WorkspaceEngine.generateID();
		this.listeners[id] = listener;
		return id;
	}

	removeRepaintListener(id: string){
		delete this.listeners[id];
	}

	fireRepaintListeners(){
		for(let i in this.listeners){
			this.listeners[i]();
		}
	}

	registerFactory(factory: WorkspacePanelFactory) {
		this.factories[factory.type] = factory;
	}

	getFactory(model: WorkspacePanelModel) : WorkspacePanelFactory {
		if (!this.factories[model.factory]) {
			throw "Cannot find Workspace factory for model with type: [" + model.factory + "]";
		}
		return this.factories[model.factory];
	}

	setDraggingNode(node: AbstractWorkspaceModel | null){
		this.draggingNode = node;
		this.fireRepaintListeners();
	}

	static generateID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}
