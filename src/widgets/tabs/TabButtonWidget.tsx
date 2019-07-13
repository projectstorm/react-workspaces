import * as React from 'react';
import { DraggableWidget } from '../DraggableWidget';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { DropZoneWidget } from '../DropZoneWidget';
import { WorkspaceCollectionModel } from '../../models/WorkspaceCollectionModel';
import { WorkspacePanelFactory } from '../../WorkspacePanelFactory';
import { WorkspaceModel } from '../../models/WorkspaceModel';

export interface TabButtonWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export interface TabButtonWidgetState {
	shiftLeft: boolean;
	shiftRight: boolean;
}

export class TabButtonWidget extends React.Component<TabButtonWidgetProps, TabButtonWidgetState> {
	constructor(props: TabButtonWidgetProps) {
		super(props);
		this.state = {
			shiftLeft: false,
			shiftRight: false
		};
	}

	render() {
		let parent = this.props.model.parent as WorkspaceTabbedModel;

		return (
			<DraggableWidget
				className={
					'srw-tab ' +
					(this.state.shiftLeft ? 'srw-tab--shift-left ' : '') +
					(!parent.isLastModel(this.props.model) && this.state.shiftRight ? 'srw-tab--shift-right ' : '')
				}
				onClick={() => {
					(this.props.model.parent as WorkspaceTabbedModel).setSelected(this.props.model);
					this.props.engine.fireRepaintListeners();
				}}
				engine={this.props.engine}
				model={this.props.model}>
				{this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model).generatePanelTab({
					engine: this.props.engine,
					model: this.props.model,
					selected: this.props.model.id === parent.getSelected().id
				})}
				{this.props.engine.draggingID && (
					<>
						<DropZoneWidget
							vertical={false}
							parent={this.props.model}
							dropped={model => {
								if (model instanceof WorkspaceCollectionModel) {
									model.getFlattened().forEach(child => {
										parent.addModelBefore(this.props.model, child);
										parent.setSelected(child);
										this.props.engine.fireModelUpdated();
									});
								} else if (model instanceof WorkspaceModel) {
									parent.addModelBefore(this.props.model, model);
									parent.setSelected(model);
									this.props.engine.fireModelUpdated();
								}
							}}
							engine={this.props.engine}
							hover={entered => {
								this.setState({ shiftLeft: entered });
							}}
							baseClass="srw-tab__dropzone"
							className="srw-tab--left"
						/>
						<DropZoneWidget
							vertical={false}
							parent={this.props.model}
							dropped={model => {
								if (model instanceof WorkspaceCollectionModel) {
									model.getFlattened().forEach(child => {
										parent.addModelAfter(this.props.model, child);
										parent.setSelected(child);
										this.props.engine.fireModelUpdated();
									});
								} else if (model instanceof WorkspaceModel) {
									parent.addModelAfter(this.props.model, model);
									parent.setSelected(model);
									this.props.engine.fireModelUpdated();
								}
							}}
							engine={this.props.engine}
							hover={entered => {
								this.setState({ shiftRight: entered });
							}}
							baseClass="srw-tab__dropzone"
							className="srw-tab--right"
						/>
					</>
				)}
			</DraggableWidget>
		);
	}
}
