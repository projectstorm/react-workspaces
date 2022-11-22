import * as React from 'react';
import styled from '@emotion/styled';
import { DraggableWidget, useForceUpdate, useModelElement, WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';
import { useEffect } from 'react';

export interface TabGroupWidgetProps {
	model: WorkspaceTabModel;
	engine: WorkspaceEngine;
	tabs: JSX.Element;
}

namespace S {
	export const Container = styled.div`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: 1;
		height: 100%;
	`;

	export const Draggable = styled(DraggableWidget)`
		display: flex;
		flex-wrap: wrap;
		flex-grow: 0;
	`;

	export const Content = styled.div`
		flex-grow: 1;
		display: flex;
		height: 100%;
	`;
}
export const TabGroupWidget: React.FC<TabGroupWidgetProps> = (props) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.model.registerListener({
			selectionChanged: () => {
				forceUpdate();
			}
		});
	}, []);
	const ref = useModelElement({
		model: props.model,
		engine: props.engine
	});

	let selected = props.model.getSelected();
	let selectedFactory = props.engine.getFactory(selected);

	return (
		<S.Container>
			<S.Draggable engine={props.engine} model={props.model}>
				{props.tabs}
			</S.Draggable>
			<S.Content ref={ref}>
				{selectedFactory.generateContent({
					model: selected,
					engine: props.engine
				})}
			</S.Content>
		</S.Container>
	);
};
