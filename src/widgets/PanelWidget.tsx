import * as React from 'react';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { DraggableWidget } from './DraggableWidget';
import { WorkspacePanelFactory } from '../WorkspacePanelFactory';
import { WorkspaceModel } from '../models/WorkspaceModel';
import styled from "@emotion/styled";
import {PerformanceWidget} from "./PerformanceWidget";

export interface PanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	expand?: boolean;
}

namespace S{
	export const Container = styled.div<{expand: boolean}>`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-shrink: 0;
		flex-grow: ${p => p.expand ? 1: 0};
	`;

	export const Content = styled.div`
		flex-grow: 1;
		display: flex;
	`;
}

export class PanelWidget extends React.Component<PanelWidgetProps> {
	constructor(props: PanelWidgetProps) {
		super(props);
	}

	render() {
		let factory = this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model);
		return (
			<S.Container expand={this.props.expand} >
				<DraggableWidget model={this.props.model} engine={this.props.engine}>
					{factory.generatePanelTitle({
						model: this.props.model,
						engine: this.props.engine
					})}
				</DraggableWidget>
				<S.Content>
					<PerformanceWidget engine={this.props.engine} data={this.props.model.toArray()} children={() => {
						return factory.generatePanelContent({
							model: this.props.model,
							engine: this.props.engine
						})
					}}/>
				</S.Content>
			</S.Container>
		);
	}
}
