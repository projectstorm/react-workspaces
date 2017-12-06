import * as React from "react";
import * as _ from "lodash";
import {WorkspaceTabbedModel} from "../models/WorkspaceTabbedModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {DraggableWidget} from "./DraggableWidget";
import {ContainerWidget} from "./ContainerWidget";
import {WorkspacePanelModel} from "../models/WorkspacePanelModel";
import {DropZoneWidget} from "./DropZoneWidget";
import {TabButtonWidget} from "./TabButtonWidget";

export interface TabGroupWidgetProps {
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
}

export interface TabGroupWidgetState {
}

export class TabGroupWidget extends React.Component<TabGroupWidgetProps, TabGroupWidgetState> {

	constructor(props: TabGroupWidgetProps) {
		super(props);
		this.state = {}
	}

	render() {
		let selected = this.props.model.getSelected();
		let selectedFactory = this.props.engine.getFactory(selected);

		return (
			<div className={"srw-tabgroup srw-tabgroup--" + (this.props.model.expand ? 'expand' : 'contract')}>
				<div className="srw-tabgroup__tabs">
					{
						_.map(this.props.model.children, (child) => {
							return (
								<TabButtonWidget model={child} engine={this.props.engine} key={child.id} />
							);
						})
					}
				</div>
				<div className="srw-tabgroup__content">
					{
						selectedFactory.generatePanelContent(selected)
					}
				</div>
				<ContainerWidget engine={this.props.engine} model={this.props.model} hide={['top']}/>
			</div>
		);
	}
}
