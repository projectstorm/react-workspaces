import * as React from 'react';
import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { StandardLayoutWidget } from '../../widgets/layouts/StandardLayoutWidget';
import { MicroLayoutWidget } from '../../widgets/layouts/MicroLayoutWidget';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import styled from '@emotion/styled';

export interface TrayWidgetProps {
	node: WorkspaceTrayModel;
	engine: WorkspaceEngine;
	header: JSX.Element;
	className?;
}

export interface TrayWidgetState {
	height: number;
}

namespace S {
	export const Container = styled.div<{ expand: boolean }>`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: ${(p) => (p.expand ? 1 : 0)};
		${(p) => p.expand && `width: 50%`};
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
			<S.Container className={this.props.className} expand={expand}>
				{this.getHeader()}
				{this.props.node.mode === 'micro' ? (
					<S.MicroLayout node={this.props.node} engine={this.props.engine} />
				) : (
					<S.StandardLayout height={this.state.height} node={this.props.node} engine={this.props.engine} />
				)}
			</S.Container>
		);
	}
}
