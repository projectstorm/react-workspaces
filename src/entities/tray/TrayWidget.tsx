import * as React from 'react';
import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { StandardLayoutWidget } from '../../widgets/layouts/StandardLayoutWidget';
import { MicroLayoutWidget } from '../../widgets/layouts/MicroLayoutWidget';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface TrayWidgetProps {
	node: WorkspaceNodeModel;
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

	export const Content = css`
		flex-grow: 1;
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
		const style = css`
			max-height: calc(100% - ${this.state.height}px);
			flex-grow: 1;
		`;
		return (
			<S.Container className={this.props.className} expand={expand}>
				{this.getHeader()}
				{this.props.node.mode === 'micro' ? (
					<MicroLayoutWidget css={S.Content} node={this.props.node} engine={this.props.engine} />
				) : (
					<StandardLayoutWidget css={style} node={this.props.node} engine={this.props.engine} />
				)}
			</S.Container>
		);
	}
}
