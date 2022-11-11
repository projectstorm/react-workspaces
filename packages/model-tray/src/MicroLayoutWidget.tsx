import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import { DraggableWidget, FloatingPanelWidget, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';

export interface MicroLayoutWidgetProps {
	node: WorkspaceTrayModel;
	engine: WorkspaceEngine;
	factory: WorkspaceTrayFactory;
	className?: any;
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

		::-webkit-scrollbar {
			width: 0;
		}
	`;
}

export class MicroLayoutWidget extends React.Component<MicroLayoutWidgetProps> {
	div: HTMLDivElement;
	buttons: { [id: string]: HTMLDivElement };

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
				ref={(ref) => {
					this.div = ref;
				}}
			>
				<S.Scrollable>
					{_.map(this.props.node.getFlattened(), (child) => {
						let selected = this.props.node.floatingModel && this.props.node.floatingModel.id === child.id;
						return (
							<div
								key={child.id}
								ref={(ref) => {
									this.buttons[child.id] = ref;
								}}
							>
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
									model={child}
								>
									{this.props.factory.renderMicroPanelForModel(child)}
								</DraggableWidget>
							</div>
						);
					})}
					{
						// is rendered into a React portal
						this.props.node.floatingModel && this.getFloatingModel()
					}
				</S.Scrollable>
			</S.MicroLayout>
		);
	}
}
