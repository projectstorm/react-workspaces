import * as React from 'react';
import { useEffect } from 'react';
import { WorkspaceTrayMode, WorkspaceTrayModel } from './WorkspaceTrayModel';
import styled from '@emotion/styled';
import { DraggableWidget, useForceUpdate, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
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
			<S.MicroLayoutShrink node={props.node} engine={props.engine} factory={props.factory} />
			<PanelContent engine={props.engine} model={props.node.getSelectedModel()} />
		</S.Content>
	);
};

export const TrayContentShrink: React.FC<TrayWidgetProps> = (props) => {
	return <S.MicroLayout node={props.node} engine={props.engine} factory={props.factory} />;
};

export const TrayWidget: React.FC<TrayWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.node.registerListener({
			selectionChanged: () => {
				forceUpdate();
			}
		});
	}, []);
	const expand = props.node.shouldExpand() && props.node.mode === WorkspaceTrayMode.NORMAL;
	return (
		<S.Container width={props.node.size.width} className={props.className} expand={expand}>
			{
				<DraggableWidget model={props.node} engine={props.engine}>
					{props.header}
				</DraggableWidget>
			}
			{props.node.mode === WorkspaceTrayMode.NORMAL ? (
				<TrayContentExpanded {...props} />
			) : (
				<TrayContentShrink {...props} />
			)}
		</S.Container>
	);
};
