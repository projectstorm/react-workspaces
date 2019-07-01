import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TabButtonWidget } from './TabButtonWidget';
import { WorkspacePanelFactory } from '../../WorkspacePanelFactory';

export interface TabGroupWidgetProps {
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
}

export interface TabGroupWidgetState {}

export class TabGroupWidget extends React.Component<TabGroupWidgetProps, TabGroupWidgetState> {
	constructor(props: TabGroupWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		let selected = this.props.model.getSelected();
		let selectedFactory = this.props.engine.getFactory<WorkspacePanelFactory>(selected);

		return (
			<div className={'srw-tabgroup'}>
				<div className="srw-tabgroup__tabs">
					{_.map(this.props.model.children, child => {
						return <TabButtonWidget model={child} engine={this.props.engine} key={child.id} />;
					})}
				</div>
				<div className="srw-tabgroup__content">
					{selectedFactory.generatePanelContent({
						model: selected,
						engine: this.props.engine
					})}
				</div>
			</div>
		);
	}
}
