import * as React from 'react';
import { useEffect } from 'react';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { useForceUpdate } from '../../widgets/hooks/useForceUpdate';

export interface DirectionLayoutChildDirective {
	expand: boolean;
	size: number;
}

namespace S {
	export const ChildContainer = styled.div<{ width: number; height: number; expand: boolean }>`
		${(p) => (p.width ? `min-width: ${p.width}px; width: ${p.width}px` : '')};
		${(p) => (p.height ? `min-height: ${p.height}px; height: ${p.height}px` : '')};
		flex-shrink: ${(p) => (p.expand ? 1 : 0)};
		flex-grow: ${(p) => (p.expand ? 1 : 0)};
	`;
}

export interface DirectionChildWidgetProps {
	vertical: boolean;
	model: WorkspaceModel;
	directive: DirectionLayoutChildDirective;
	generateElement: (model: WorkspaceModel) => JSX.Element;
}

export const DirectionChildWidget: React.FC<DirectionChildWidgetProps> = (props) => {
	let width = null;
	let height = null;
	let expand = props.directive.expand;

	if (!expand && props.vertical) {
		height = props.model.size.height;
	} else if (!expand) {
		width = props.model.size.width;
	}

	const forceUpdate = useForceUpdate();
	useEffect(() => {
		return props.model.size.registerListener({
			updated: () => {
				forceUpdate();
			}
		});
	}, []);

	return (
		<S.ChildContainer expand={expand} width={width} height={height}>
			{props.generateElement(props.model)}
		</S.ChildContainer>
	);
};
