import {WorkspaceEngine} from "../WorkspaceEngine";
import {AbstractWorkspaceCollectionModel} from "./AbstractWorkspaceCollectionModel";

export class AbstractWorkspaceModel{

	id: string;
	parent: AbstractWorkspaceCollectionModel;
	expand: boolean;
	classname: string;

	constructor(){
		this.id = WorkspaceEngine.generateID();
		this.parent = null;
		this.expand = true;
		this.classname = (this.constructor as any).name;
	}

	setParent(parent: AbstractWorkspaceCollectionModel){
		this.parent = parent;
	}

	setExpand(expand: boolean = true): this{
		this.expand = expand;
		return this;
	}

	toArray(){
		return {
			classname: this.classname,
			id: this.id,
			expand: this.expand
		}
	}

	fromArray(payload: any){
		this.id = payload.id;
		this.expand = payload.expand;
	}
}
