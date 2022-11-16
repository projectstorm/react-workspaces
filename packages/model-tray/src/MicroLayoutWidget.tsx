import * as React from 'react';
import * as _ from 'lodash';
import styled from '@emotion/styled';
import { WorkspaceTrayModel } from './WorkspaceTrayModel';
import { useModelElement, WorkspaceEngine, WorkspaceModel } from '@projectstorm/react-workspaces-core';
import { WorkspaceTrayFactory } from './WorkspaceTrayFactory';

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
}

export const MicroWrapper: React.FC<MicroWrapperProps> = (props) => {
	const ref = useModelElement({
		model: props.model,
		engine: props.engine
	});
	let selected = props.node.floatingModel && props.node.floatingModel.id === props.model.id;
	const renderer = props.factory.getRendererForModel(props.model);
	return (
		<div ref={ref}>
			{renderer?.renderIcon({
				model: props.model,
				selected: selected
			}) || <span>?</span>}
		</div>
	);
};

export class MicroLayoutWidget extends React.Component<MicroLayoutWidgetProps> {
	div: HTMLDivElement;

	componentDidMount() {
		if (this.props.node.floatingModel) {
			this.forceUpdate();
		}
	}

	render() {
		return (
			<S.MicroLayout
				className={this.props.className}
				ref={(ref) => {
					this.div = ref;
				}}
			>
				<S.Scrollable>
					{_.map(this.props.node.getFlattened(), (child) => {
						return <MicroWrapper {...this.props} model={child} key={child.id} />;
					})}
				</S.Scrollable>
			</S.MicroLayout>
		);
	}
}
