import * as React from "react";
import * as _ from "lodash";
import {WorkspaceTabbedModel} from "../models/WorkspaceTabbedModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {ContainerWidget} from "./ContainerWidget";
import {BaseWidget, BaseWidgetProps} from "@projectstorm/react-core";
import {TabButtonWidget} from "./TabButtonWidget";

export interface TabGroupWidgetProps extends BaseWidgetProps{
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
}

export interface TabGroupWidgetState {
}

export class TabGroupWidget extends BaseWidget<TabGroupWidgetProps, TabGroupWidgetState> {

	constructor(props: TabGroupWidgetProps) {
		super('srw-tabgroup',props);
		this.state = {}
	}

	render() {
		let selected = this.props.model.getSelected();
		let selectedFactory = this.props.engine.getFactory(selected);

		return (
			<div {
				...this.getProps({
					'--expand': this.props.model.expand,
					'--contract': !this.props.model.expand
				})}
			>
				<div className={this.bem('__tabs')}>
					{
						_.map(this.props.model.children, (child) => {
							return (
								<TabButtonWidget model={child} engine={this.props.engine} key={child.id} />
							);
						})
					}
				</div>
				<div className={this.bem('__content')}>
					{
						selectedFactory.generatePanelContent(selected)
					}
				</div>
				<ContainerWidget engine={this.props.engine} model={this.props.model} hide={['top']}/>
			</div>
		);
	}
}
