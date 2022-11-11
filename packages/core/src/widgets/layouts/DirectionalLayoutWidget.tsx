import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import styled from '@emotion/styled';
import { DividerWidget } from '../primitives/DividerWidget';
import { DimensionContainer } from '../../core/DimensionContainer';

export interface DirectionalLayoutWidgetProps {
	vertical: boolean;
	expand: boolean;
	dropZoneAllowed: (index: number) => boolean;
	dropped: (index: number, model: WorkspaceModel) => any;
	engine: WorkspaceEngine;
	data: WorkspaceModel[];
	generateElement: (model: WorkspaceModel) => JSX.Element;
	dimensionContainerForDivider: (index: number) => DimensionContainer;
	className?: any;
	forwardRef: React.RefObject<HTMLDivElement>;
}

namespace S {
	export const Container = styled.div<{ expand: boolean; vertical: boolean }>`
		display: flex;
		flex-grow: ${(p) => (p.expand ? 1 : 0)};
		flex-direction: ${(p) => (p.vertical ? 'column' : 'row')};
		max-height: 100%;
	`;

	export const ChildContainer = styled.div<{ width: number; height: number; expand: boolean }>`
		${(p) => (p.width ? `width: ${p.width}px` : '')};
		${(p) => (p.height ? `height: ${p.height}px` : '')};
		flex-shrink: ${(p) => (p.expand ? 1 : 0)};
		flex-grow: ${(p) => (p.expand ? 1 : 0)};
	`;
}

const ChildContainerWidget: React.FC<{
	vertical: boolean;
	model: WorkspaceModel;
	generateElement: (model: WorkspaceModel) => JSX.Element;
}> = (props) => {
	let width = null;
	let height = null;
	let expand: boolean = false;
	if (props.vertical) {
		if (!props.model.expandVertical) {
			height = props.model.height;
		} else {
			expand = true;
		}
	} else {
		if (!props.model.expandHorizontal) {
			width = props.model.width;
		} else {
			expand = true;
		}
	}

	return (
		<S.ChildContainer expand={expand} width={width} height={height}>
			{props.generateElement(props.model)}
		</S.ChildContainer>
	);
};

export const DirectionalLayoutWidget: React.FC<DirectionalLayoutWidgetProps> = (props) => {
	return (
		<S.Container ref={props.forwardRef} className={props.className} expand={props.expand} vertical={props.vertical}>
			<DividerWidget dimensionContainer={props.dimensionContainerForDivider(0)} key="drop-first" />
			{_.map(props.data, (model: WorkspaceModel, index) => {
				return (
					<React.Fragment key={model.id}>
						<ChildContainerWidget {...props} model={model} />
						<DividerWidget dimensionContainer={props.dimensionContainerForDivider(index + 1)} key="drop-first" />
					</React.Fragment>
				);
			})}
		</S.Container>
	);
};
