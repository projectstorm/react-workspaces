import * as React from 'react';
import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import styled from '@emotion/styled';
import { DraggableWidget, StandardLayoutWidget, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { MicroLayoutWidget } from './MicroLayoutWidget';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';
import { WorkspaceNodeWidget } from '@projectstorm/react-workspaces-core';

export interface TrayWidgetProps {
	node: WorkspaceTrayModel;
	engine: WorkspaceEngine;
	header: JSX.Element;
	className?: any;
	factory: WorkspaceTrayFactory;
}

export interface TrayWidgetState {
	height: number;
}

namespace S {
	export const Container = styled.div<{ expand: boolean; width: number }>`
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;
	`;

	export const MicroLayout = styled(MicroLayoutWidget)`
		flex-grow: 1;
	`;

	export const StandardLayout = styled(StandardLayoutWidget)<{ height: number }>`
		flex-grow: 1;
		max-height: calc(100% - ${(p) => p.height}px);
	`;
}

export class TrayWidget extends React.Component<TrayWidgetProps, TrayWidgetState> {
	headerRef: React.RefObject<HTMLDivElement>;
	observer: ResizeObserver;

	constructor(props) {
		super(props);
		this.state = {
			height: 0
		};
		this.headerRef = React.createRef();
	}

	getHeader() {
		return (
			<DraggableWidget forwardRef={this.headerRef} model={this.props.node} engine={this.props.engine}>
				{this.props.header}
			</DraggableWidget>
		);
	}

	componentWillUnmount() {
		this.observer && this.observer.disconnect();
	}

	componentDidMount(): void {
		if (this.headerRef.current) {
			this.observer = new ResizeObserver(() => {
				this.setState({
					height: this.headerRef.current.getBoundingClientRect().height
				});
			});
			this.observer.observe(this.headerRef.current);
		}
	}

	render() {
		const expand = this.props.node.shouldExpand() && this.props.node.mode === 'expand';
		return (
			<S.Container width={this.props.node.size.width} className={this.props.className} expand={expand}>
				{this.getHeader()}
				{this.props.node.mode === 'micro' ? (
					<S.MicroLayout node={this.props.node} engine={this.props.engine} factory={this.props.factory} />
				) : (
					<WorkspaceNodeWidget model={this.props.node} engine={this.props.engine} factory={this.props.factory} />
				)}
			</S.Container>
		);
	}
}
