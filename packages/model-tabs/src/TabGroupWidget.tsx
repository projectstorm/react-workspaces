import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	DraggableWidget,
	PerformanceWidget,
	useModelElement,
	WorkspaceEngine
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTabModel } from './WorkspaceTabModel';

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

	export const Content = styled.div<{ height: number }>`
		flex-grow: 1;
		display: flex;
		height: 100%;
		max-height: calc(100% - ${(p) => p.height}px);
	`;
}
export const TabGroupWidget: React.FC<TabGroupWidgetProps> = (props) => {
	const headerRef = useRef<HTMLDivElement>();
	const [height, setHeight] = useState(0);
	const ref = useModelElement({
		model: props.model,
		engine: props.engine
	});
	useEffect(() => {
		requestAnimationFrame(() => {
			if (headerRef.current) {
				setHeight(headerRef.current.getBoundingClientRect().height);
			}
		});
	}, []);

	let selected = props.model.getSelected();
	let selectedFactory = props.engine.getFactory(selected);

	return (
		<S.Container>
			<S.Draggable forwardRef={headerRef} engine={props.engine} model={props.model}>
				{props.tabs}
			</S.Draggable>
			<S.Content ref={ref} height={height}>
				<PerformanceWidget
					data={selected.toArray()}
					engine={props.engine}
					children={() => {
						return selectedFactory.generateContent({
							model: selected,
							engine: props.engine
						});
					}}
				/>
			</S.Content>
		</S.Container>
	);
};
