import * as React from 'react';
import { WorkspaceTrayMode, WorkspaceTrayModel } from './WorkspaceTrayModel';
import styled from '@emotion/styled';
import { DraggableWidget, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import { MicroLayoutWidget } from './MicroLayoutWidget';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';

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

	export const MicroLayoutShrink = styled(MicroLayoutWidget)<{ width: number }>`
		min-width: ${(p) => p.width}px;
		max-width: ${(p) => p.width}px;
		flex-grow: 0;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
		flex-direction: row;
	`;

	export const PanelContent = styled.div`
		display: flex;
		flex-grow: 1;
	`;
}

export interface PanelContentProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export const PanelContent: React.FC<PanelContentProps> = (props) => {
	return (
		<S.PanelContent>
			{props.engine.getFactory(props.model).generateContent({
				model: props.model,
				engine: props.engine
			})}
		</S.PanelContent>
	);
};

export const TrayContentExpanded: React.FC<TrayWidgetProps> = (props) => {
	return (
		<S.Content>
			<S.MicroLayoutShrink
				node={props.node}
				engine={props.engine}
				factory={props.factory}
				width={props.node.options.iconWidth}
			/>
			<PanelContent engine={props.engine} model={props.node.getSelectedModel()} />
		</S.Content>
	);
};

export const TrayContentShrink: React.FC<TrayWidgetProps> = (props) => {
	return <S.MicroLayout node={props.node} engine={props.engine} factory={props.factory} />;
};

export class TrayWidget extends React.Component<TrayWidgetProps, TrayWidgetState> {
	getHeader() {
		return (
			<DraggableWidget model={this.props.node} engine={this.props.engine}>
				{this.props.header}
			</DraggableWidget>
		);
	}

	render() {
		const expand = this.props.node.shouldExpand() && this.props.node.mode === WorkspaceTrayMode.NORMAL;
		return (
			<S.Container width={this.props.node.size.width} className={this.props.className} expand={expand}>
				{this.getHeader()}
				{this.props.node.mode === WorkspaceTrayMode.NORMAL ? (
					<TrayContentExpanded {...this.props} />
				) : (
					<TrayContentShrink {...this.props} />
				)}
			</S.Container>
		);
	}
}
