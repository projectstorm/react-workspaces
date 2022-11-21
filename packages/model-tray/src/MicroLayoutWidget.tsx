import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import {
	DraggableWidget,
	useModelElement,
	useScrollObserver,
	WorkspaceEngine,
	WorkspaceModel
} from '@projectstorm/react-workspaces-core';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';
import { useRef } from 'react';
import { useResizeObserver } from '@projectstorm/react-workspaces-core';

export interface MicroLayoutWidgetProps {
	node: WorkspaceTrayModel;
	engine: WorkspaceEngine;
	factory: WorkspaceTrayFactory;
	className?: any;
}

namespace S {
	export const MicroLayout = styled.div`
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex-grow: 1;
		overflow: hidden;
	`;

	export const Scrollable = styled.div`
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		align-items: stretch;

		::-webkit-scrollbar {
			width: 0;
		}
	`;
}

export interface MicroWrapperProps {
	model: WorkspaceModel;
	node: WorkspaceTrayModel;
	engine: WorkspaceEngine;
	factory: WorkspaceTrayFactory;
	scrollRef: React.RefObject<HTMLDivElement>;
}

export const MicroWrapper: React.FC<MicroWrapperProps> = (props) => {
	const ref = useRef<HTMLDivElement>();
	useResizeObserver({
		forwardRef: ref,
		dimension: props.model.r_dimensions
	});
	useScrollObserver({
		forwardRef: props.scrollRef,
		dimension: props.model.r_dimensions
	});
	let selected = props.node.selectedModel && props.node.selectedModel.id === props.model.id;
	const renderer = props.factory.getRendererForModel(props.model);
	return (
		<DraggableWidget model={props.model} engine={props.engine}>
			<div
				ref={ref}
				onClick={() => {
					if (props.node.selectedModel === props.model) {
						props.node.setSelectedModel(null);
					} else {
						props.node.setSelectedModel(props.model);
					}
				}}
			>
				{renderer?.renderIcon({
					model: props.model,
					selected: selected,
					parent: props.node
				}) || <span>?</span>}
			</div>
		</DraggableWidget>
	);
};

export const MicroLayoutWidget: React.FC<MicroLayoutWidgetProps> = (props) => {
	const ref = useRef<HTMLDivElement>();

	return (
		<S.MicroLayout className={props.className}>
			<S.Scrollable ref={ref}>
				{_.map(props.node.getFlattened(), (child) => {
					return <MicroWrapper scrollRef={ref} {...props} model={child} key={child.id} />;
				})}
			</S.Scrollable>
		</S.MicroLayout>
	);
};
