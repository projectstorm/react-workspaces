import * as React from "react";
import {DefaultWorkspacePanelFactory} from "./defaults/DefaultWorkspacePanelFactory";
import {WorkspaceNodeModel} from "../src/models/node/WorkspaceNodeModel";
import {DefaultWorkspacePanelModel} from "./defaults/DefaultWorkspacePanelModel";
import {WorkspaceEngine} from "../src/WorkspaceEngine";
import {WorkspaceWidget} from "../src/widgets/WorkspaceWidget";
import {WorkspaceTabbedModel} from "../src/models/tabs/WorkspaceTabbedModel";

export interface Demo1Props {
}

export interface Demo1State {
	engine: WorkspaceEngine;
	model: WorkspaceNodeModel;
}

export class Demo1 extends React.Component<Demo1Props, Demo1State> {

	constructor(props: Demo1Props) {
		super(props);
		let engine = new WorkspaceEngine();
		engine.registerFactory(new DefaultWorkspacePanelFactory());
		engine.registerListener({
			generateTrayHeader: (model) => {
				return (
					<div className="demo-tray-header" onDoubleClick={() => {
						model.setMode(model.mode === 'micro' ? 'expand' : 'micro');
						engine.fireRepaintListeners();
					}}>
					</div>
				)
			}
		});

		let model = new WorkspaceNodeModel();
		model

			//left panel
			.addModel((new WorkspaceNodeModel())
				.setExpand(false)
				.setVertical(true)
				.addModel(new DefaultWorkspacePanelModel('Panel 1'))
				.addModel(new DefaultWorkspacePanelModel('Panel 2'))
			)

			//tab panel
			.addModel((new WorkspaceTabbedModel())
				.addModel(new DefaultWorkspacePanelModel('Tab 1'))
				.addModel(new DefaultWorkspacePanelModel('Tab 2'))
				.addModel(new DefaultWorkspacePanelModel('Tab 3'))
			)

			//right panel
			.addModel(new DefaultWorkspacePanelModel('Panel 3'))
			.addModel((new WorkspaceNodeModel())
				.setExpand(false)
				.setVertical(true)
				.setMode('micro')
				.addModel(new DefaultWorkspacePanelModel('Panel 4'))
				.addModel(new DefaultWorkspacePanelModel('Panel 5'))
				.addModel(new DefaultWorkspacePanelModel('Panel 6'))
			);

		this.state = {
			engine: engine,
			model: model
		}
	}

	render() {
		return (
			<WorkspaceWidget className="demo" engine={this.state.engine} model={this.state.model}/>
		)
	}
}
