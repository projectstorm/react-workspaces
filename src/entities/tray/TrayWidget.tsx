import * as React from 'react';
import { WorkspaceNodeModel } from './WorkspaceNodeModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { StandardLayoutWidget } from '../../widgets/layouts/StandardLayoutWidget';
import { MicroLayoutWidget } from '../../widgets/layouts/MicroLayoutWidget';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export interface TrayWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	header: JSX.Element;
}

namespace S {
	export const Container = styled.div<{ expand: boolean }>`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: ${p => (p.expand ? 1 : 0)};
		${p => p.expand && `width: 50%`};
	`;

	export const Content = css`
		flex-grow: 1;
	`;
}

export class TrayWidget extends React.Component<TrayWidgetProps> {
	getHeader() {
		return (
			<DraggableWidget model={this.props.node} engine={this.props.engine}>
				{this.props.header}
			</DraggableWidget>
		);
	}

	render() {
		const expand = this.props.node.shouldExpand() && this.props.node.mode === 'expand';
		return (
			<S.Container expand={expand}>
				{this.getHeader()}
				{this.props.node.mode === 'micro' ? (
					<MicroLayoutWidget css={S.Content} node={this.props.node} engine={this.props.engine} />
				) : (
					<StandardLayoutWidget css={S.Content} node={this.props.node} engine={this.props.engine} />
				)}
			</S.Container>
		);
	}
}
