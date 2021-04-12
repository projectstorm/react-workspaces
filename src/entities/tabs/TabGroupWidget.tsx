import * as React from 'react';
import { WorkspaceTabbedModel } from './WorkspaceTabbedModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspacePanelFactory } from '../panel/WorkspacePanelFactory';
import styled from '@emotion/styled';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { PerformanceWidget } from '../../widgets/PerformanceWidget';

export interface TabGroupWidgetProps {
	model: WorkspaceTabbedModel;
	engine: WorkspaceEngine;
	tabs: JSX.Element;
}

export interface TabGroupWidgetState {
	height: number;
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

export class TabGroupWidget extends React.Component<TabGroupWidgetProps, TabGroupWidgetState> {
	headerRef: React.RefObject<HTMLDivElement>;

	constructor(props) {
		super(props);
		this.headerRef = React.createRef();
		this.state = {
			height: 0
		};
	}

	componentDidMount(): void {
		requestAnimationFrame(() => {
			if (this.headerRef.current) {
				this.setState({
					height: this.headerRef.current.getBoundingClientRect().height
				});
			}
		});
	}

	render() {
		let selected = this.props.model.getSelected();
		let selectedFactory = this.props.engine.getFactory<WorkspacePanelFactory>(selected);

		return (
			<S.Container>
				<S.Draggable forwardRef={this.headerRef} engine={this.props.engine} model={this.props.model}>
					{this.props.tabs}
				</S.Draggable>
				<S.Content height={this.state.height}>
					<PerformanceWidget
						data={selected.toArray()}
						engine={this.props.engine}
						children={() => {
							return selectedFactory.generatePanelContent({
								model: selected,
								engine: this.props.engine
							});
						}}
					/>
				</S.Content>
			</S.Container>
		);
	}
}
