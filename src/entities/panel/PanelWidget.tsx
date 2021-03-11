import * as React from 'react';
import { WorkspaceEngine, WorkspaceEngineError } from '../../core/WorkspaceEngine';
import { DraggableWidget } from '../../widgets/primitives/DraggableWidget';
import { WorkspacePanelFactory } from './WorkspacePanelFactory';
import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import styled from '@emotion/styled';
import { PerformanceWidget } from '../../widgets/PerformanceWidget';

export interface PanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	expand?: boolean;
}

namespace S {
	export const Container = styled.div<{ expand: boolean }>`
		display: flex;
		flex-direction: column;
		position: relative;
		flex-shrink: ${(p) => (p.expand ? 1 : 0)};
		flex-grow: ${(p) => (p.expand ? 1 : 0)};
		max-height: 100%;
		overflow: hidden;
	`;

	export const Content = styled.div`
		flex-grow: 1;
		display: flex;
		max-height: 100%;
		overflow: hidden;
	`;
}

export class PanelWidget extends React.Component<PanelWidgetProps> {
	render() {
		let factory: WorkspacePanelFactory;
		try {
			factory = this.props.engine.getFactory<WorkspacePanelFactory>(this.props.model);
			return (
				<S.Container expand={this.props.expand}>
					<DraggableWidget model={this.props.model} engine={this.props.engine}>
						{factory.generatePanelTitle({
							model: this.props.model,
							engine: this.props.engine
						})}
					</DraggableWidget>
					<S.Content>
						<PerformanceWidget
							key={this.props.model.id}
							engine={this.props.engine}
							data={this.props.model.toArray()}
							children={() => {
								return factory.generatePanelContent({
									model: this.props.model,
									engine: this.props.engine
								});
							}}
						/>
					</S.Content>
				</S.Container>
			);
		} catch (ex) {
			if ((ex as WorkspaceEngineError)._is__storm_workspaces_error_) {
				this.props.model.delete();
			}
			return null;
		}
	}
}
