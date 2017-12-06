import * as React from "react";
import * as _ from "lodash";
import {WorkspacePanelModel} from "../../models/WorkspacePanelModel";
import {WorkspaceNodeModel} from "../../models/WorkspaceNodeModel";
import {WorkspaceTabbedModel} from "../../models/WorkspaceTabbedModel";
import {PanelWidget} from "../PanelWidget";
import {TabGroupWidget} from "../TabGroupWidget";
import {WorkspaceEngine} from "../../WorkspaceEngine";
import {TrayWidget} from "../TrayWidget";
import {AbstractWorkspaceModel} from "../../models/AbstractWorkspaceModel";

export interface StandardLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
}

export interface StandardLayoutWidgetState {
}

export class StandardLayoutWidget extends React.Component<StandardLayoutWidgetProps, StandardLayoutWidgetState> {

	constructor(props: StandardLayoutWidgetProps) {
		super(props);
		this.state = {}
	}

	generateElement(model: AbstractWorkspaceModel) {
		if (model instanceof WorkspacePanelModel) {
			return <PanelWidget key={model.id} engine={this.props.engine} model={model}/>;
		} else if (model instanceof WorkspaceNodeModel) {
			return <TrayWidget key={model.id} node={model} engine={this.props.engine}/>;
		} else if (model instanceof WorkspaceTabbedModel) {
			return <TabGroupWidget key={model.id} model={model} engine={this.props.engine}/>;
		} else {
			return;
		}
	}

	render() {
		return (
			<div className={
				"srw-standard-layout " +
				"srw-standard-layout--" + (this.props.node.vertical ? 'vertical' : 'horizontal')}
			>
				{_.map(this.props.node.children, (model) => {
					return (
						this.generateElement(model)
					);
				})}
			</div>
		);
	}
}
