import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceNodeModel } from '../../entities/tray/WorkspaceNodeModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { DraggableWidget } from '../primitives/DraggableWidget';
import { FloatingPanelWidget } from '../FloatingPanelWidget';
import * as PropTypes from 'prop-types';
import { WorkspacePanelFactory } from '../../entities/panel/WorkspacePanelFactory';
import styled from '@emotion/styled';

export interface MicroLayoutWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	className?;
}

namespace S {
	export const MicroLayout = styled.div`
		display: flex;
		flex-grow: 1;
		overflow: hidden;
	`;

	export const Scrollable = styled.div`
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		margin-right: -30px;
	`;
}

export class MicroLayoutWidget extends React.Component<MicroLayoutWidgetProps> {
	div: HTMLDivElement;
	buttons: { [id: string]: HTMLDivElement };

	static contextTypes = {
		workspace: PropTypes.any
	};

	constructor(props: MicroLayoutWidgetProps) {
		super(props);
		this.buttons = {};
	}

	getFloatingModel() {
		return (
			<FloatingPanelWidget
				relativeElement={this.buttons[this.props.node.floatingModel.id]}
				model={this.props.node.floatingModel}
				engine={this.props.engine}
			/>
		);
	}

	componentDidMount() {
		if (this.props.node.floatingModel) {
			this.forceUpdate();
		}
	}

	render() {
		return (
			<S.MicroLayout
				className={this.props.className}
				ref={ref => {
					this.div = ref;
				}}>
				<S.Scrollable>
					{_.map(this.props.node.getFlattened(), child => {
						let selected = this.props.node.floatingModel && this.props.node.floatingModel.id === child.id;
						return (
							<div
								key={child.id}
								ref={ref => {
									this.buttons[child.id] = ref;
								}}>
								<DraggableWidget
									onClick={() => {
										if (selected) {
											this.props.node.setFloatingModel(null);
										} else {
											this.props.node.setFloatingModel(child);
										}
										this.props.engine.fireRepaintListeners();
									}}
									engine={this.props.engine}
									model={child}>
									{this.props.engine.getFactory<WorkspacePanelFactory>(child).generateMicroButton({
										model: child,
										selected: selected,
										engine: this.props.engine
									})}
								</DraggableWidget>
							</div>
						);
					})}
					{// is rendered into a react portal
					this.props.node.floatingModel && this.getFloatingModel()}
				</S.Scrollable>
			</S.MicroLayout>
		);
	}
}
