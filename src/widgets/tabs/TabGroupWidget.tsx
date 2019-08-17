/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceTabbedModel } from '../../models/tabs/WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import { TabButtonWidget } from './TabButtonWidget';
import { WorkspacePanelFactory } from '../../WorkspacePanelFactory';
import styled from '@emotion/styled';
import { DraggableWidget } from '../DraggableWidget';
import { css } from '@emotion/core';
import { DropZoneOrderWidget } from '../dropzone/DropZoneOrderWidget';

export interface TabGroupWidgetProps {
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
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
					<DropZoneOrderWidget
						size={50}
						engine={this.props.engine}
						vertical={false}
						dropped={(element, index) => {
							this.props.model.addModel(element, index);
						}}>
						{_.map(this.props.model.children, child => {
							return <TabButtonWidget model={child} engine={this.props.engine} key={child.id} />;
						})}
					</DropZoneOrderWidget>
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
