import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { DropzoneDividerWidget } from './DropzoneDividerWidget';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { WorkspaceModel } from '../../models/WorkspaceModel';

export interface DropZoneOrderWidgetProps {
	vertical: boolean;
	className?;
	size?: number;
	engine: WorkspaceEngine;
	dropped: (model: WorkspaceModel, index: number) => any;
}

export interface DropZoneOrderWidgetState {
	dragging: boolean;
	draggingChild: { [index: string]: boolean };
}

namespace S {
	export const Container = styled.div<{ vertical: boolean }>`
		display: flex;
		flex-direction: ${p => (p.vertical ? 'column' : 'row')};
	`;

	export const EmptyPlaceholderV = styled.div<{ size: number }>`
		height: 10px;
		min-width: ${p => p.size}px;
	`;
	export const EmptyPlaceholderH = styled.div<{ size: number }>`
		width: 10px;
		min-height: ${p => p.size}px;
	`;
}

export class DropZoneOrderWidget extends React.Component<DropZoneOrderWidgetProps, DropZoneOrderWidgetState> {
	listener: any;

	constructor(props: DropZoneOrderWidgetProps) {
		super(props);
		this.state = {
			dragging: false,
			draggingChild: {}
		};
	}

	getDivider(index: number) {
		if (this.state.dragging || _.keys(this.state.draggingChild).length > 0) {
			return (
				<DropzoneDividerWidget
					entered={entered => {
						if (entered) {
							this.state.draggingChild[`${index}`] = true;
						} else {
							delete this.state.draggingChild[`${index}`];
						}
						this.setState({
							draggingChild: this.state.draggingChild
						});
					}}
					vertical={this.props.vertical}
					dropped={model => {
						this.props.dropped(model, index);
						this.setState({
							dragging: false,
							draggingChild: {}
						});
					}}
					size={this.props.size}
					key={0}
					engine={this.props.engine}
				/>
			);
		}
		return null;
	}

	getContent() {
		const children = React.Children.toArray(this.props.children);

		return [this.getDivider(0)].concat(
			_.map(children, (child, index) => {
				return (
					<React.Fragment>
						{child}
						{this.getDivider(index + 1)}
					</React.Fragment>
				);
			})
		);
	}

	render() {
		return (
			<S.Container
				vertical={this.props.vertical}
				className={this.props.className}
				onDragOver={event => {
					if (this.listener) {
						clearInterval(this.listener);
						this.listener = null;
					}
					event.preventDefault();
					event.dataTransfer.dropEffect = 'move';

					if (!this.state.dragging) {
						this.setState({
							dragging: true
						});
					}
				}}
				onDrop={() => {
					this.setState({
						dragging: false
					});
				}}
				onDragLeave={() => {
					this.listener = setTimeout(() => {
						this.setState({ dragging: false });
					}, 300);
				}}>
				{this.getContent()}
			</S.Container>
		);
	}
}
