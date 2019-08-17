import * as React from 'react';
import { WorkspaceNodeModel } from '../models/node/WorkspaceNodeModel';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { StandardLayoutWidget } from './layouts/StandardLayoutWidget';
import { MicroLayoutWidget } from './layouts/MicroLayoutWidget';
import { DraggableWidget } from './primitives/DraggableWidget';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export interface TrayWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
}

namespace S {
	export const Container = styled.div<{ expand: boolean }>`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: ${p => (p.expand ? 1 : 0)};
	`;

	export const Content = css`
		flex-grow: 1;
	`;
}

export class TrayWidget extends React.Component<TrayWidgetProps> {
	getHeader() {
		let header = this.props.engine.getTrayHeader(this.props.node);
		if (header) {
			return (
				<DraggableWidget model={this.props.node} engine={this.props.engine}>
					{header}
				</DraggableWidget>
			);
		}
		return null;
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
