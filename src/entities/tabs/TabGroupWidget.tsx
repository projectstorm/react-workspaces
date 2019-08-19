/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspacePanelFactory } from '../panel/WorkspacePanelFactory';
import styled from '@emotion/styled';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { css } from '@emotion/core';

export interface TabGroupWidgetProps {
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
	tabs: JSX.Element;
}

namespace S {
	export const Container = styled.div`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: 1;
	`;

	export const Tabs = css`
		display: flex;
		flex-wrap: wrap;
		flex-grow: 0;
	`;

	export const Content = styled.div`
		flex-grow: 1;
		display: flex;
	`;
}

export class TabGroupWidget extends React.Component<TabGroupWidgetProps> {
	render() {
		let selected = this.props.model.getSelected();
		let selectedFactory = this.props.engine.getFactory<WorkspacePanelFactory>(selected);

		return (
			<S.Container>
				<DraggableWidget css={S.Tabs} engine={this.props.engine} model={this.props.model}>
					{this.props.tabs}
				</DraggableWidget>
				<S.Content>
					{selectedFactory.generatePanelContent({
						model: selected,
						engine: this.props.engine
					})}
				</S.Content>
			</S.Container>
		);
	}
}
