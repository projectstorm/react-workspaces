import * as React from "react";
import {DefaultWorkspacePanelFactory} from "../src/defaults/DefaultWorkspacePanelFactory";
import {WorkspaceNodeModel} from "../src/models/WorkspaceNodeModel";
import {DefaultWorkspacePanelModel} from "../src/defaults/DefaultWorkspacePanelModel";
import {WorkspaceEngine} from "../src/WorkspaceEngine";
import {WorkspaceWidget} from "../src/widgets/WorkspaceWidget";
import {WorkspaceTabbedModel} from "../src/models/WorkspaceTabbedModel";
import {PlaceholderContentWidget} from "./PlaceholderContentWidget";

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

		let model = new WorkspaceNodeModel();
		model

			//left panel
			.addModel((new WorkspaceNodeModel())
				.setExpand(false)
				.setVertical(true)
				.addModel(
					new DefaultWorkspacePanelModel('Panel 1', () => {
						return <PlaceholderContentWidget />;
					})
				)
				.addModel(
					new DefaultWorkspacePanelModel('Panel 2', () => {
						return <PlaceholderContentWidget />;
					})
				)
			)

			//tab panel
			.addModel((new WorkspaceTabbedModel())
				.addModel(new DefaultWorkspacePanelModel('Tab 1', () => {
					return <div>Tab 1</div>;
				}))
				.addModel(new DefaultWorkspacePanelModel('Tab 2', () => {
					return <div>Tab 2</div>;
				}))
				.addModel(new DefaultWorkspacePanelModel('Tab 3', () => {
					return <div>Tab 3</div>;
				}))
			)

			//right panel
			.addModel(new DefaultWorkspacePanelModel('Panel 3', () => {
				return <PlaceholderContentWidget />;
			}))
			.addModel((new WorkspaceNodeModel())
				.setExpand(false)
				.setVertical(true)
				.setMode('micro')
				.addModel(
					new DefaultWorkspacePanelModel('Panel 4', () => {
						return <PlaceholderContentWidget />;
					})
				)
				.addModel(
					new DefaultWorkspacePanelModel('Panel 5', () => {
						return <PlaceholderContentWidget />;
					})
				)
				.addModel(
					new DefaultWorkspacePanelModel('Panel 6', () => {
						return <PlaceholderContentWidget />;
					})
				)
			)

		this.state = {
			engine: engine,
			model: model
		}
	}

	render() {
		return (
			<WorkspaceWidget engine={this.state.engine} model={this.state.model}/>
		)
	}
}
