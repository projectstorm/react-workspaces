import * as React from 'react';
import { DropZoneWidget } from '../dropzone/DropZoneWidget';
import * as _ from 'lodash';
import { WorkspaceModel } from '../../models/WorkspaceModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';
import styled from '@emotion/styled';

export interface DirectionalLayoutWidgetProps {
	vertical: boolean;
	expand: boolean;
	dropZoneAllowed: (index: number) => boolean;
	dropped: (index: number, model: WorkspaceModel) => any;
	engine: WorkspaceEngine;
	data: WorkspaceModel[];
	generateElement: (model: WorkspaceModel) => JSX.Element;
	className?;
}

namespace S {
	export const Container = styled.div<{ expand: boolean; vertical: boolean }>`
		display: flex;
		flex-grow: ${p => (p.expand ? 1 : 0)};
		flex-direction: ${p => (p.vertical ? 'column' : 'row')};
	`;
}

export class DirectionalLayoutWidget extends React.Component<DirectionalLayoutWidgetProps> {
	render() {
		return (
			<S.Container className={this.props.className} expand={this.props.expand} vertical={this.props.vertical}>
				<DropZoneWidget
					vertical={!this.props.vertical}
					disallow={!this.props.dropZoneAllowed(0)}
					dropped={model => {
						this.props.dropped(0, model);
					}}
					engine={this.props.engine}
					key="drop-first"
				/>
				{_.map(this.props.data, (model: WorkspaceModel, index) => {
					return (
						<React.Fragment key={model.id}>
							{this.props.generateElement(model)}
							<DropZoneWidget
								vertical={!this.props.vertical}
								disallow={!this.props.dropZoneAllowed(index + 1)}
								dropped={droppedModel => {
									this.props.dropped(index + 1, droppedModel);
								}}
								engine={this.props.engine}
							/>
						</React.Fragment>
					);
				})}
			</S.Container>
		);
	}
}
