import * as React from 'react';
import { DropZoneWidget } from '../DropZoneWidget';
import * as _ from 'lodash';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { WorkspaceModel } from '../../models/WorkspaceModel';
import { WorkspaceEngine } from '../../WorkspaceEngine';

export interface DirectionalLayoutWidgetProps extends BaseWidgetProps {
	vertical: boolean;
	expand: boolean;
	dropZoneAllowed: (index: number) => boolean;
	dropped: (index: number, model: WorkspaceModel) => any;
	engine: WorkspaceEngine;
}

export class DirectionalLayoutWidget extends BaseWidget<DirectionalLayoutWidgetProps> {
	constructor(props: DirectionalLayoutWidgetProps) {
		super('srw-directional-layout', props);
	}

	render() {
		const children = React.Children.toArray(this.props.children);
		return (
			<div
				{...this.getProps({
					'--expand': this.props.expand,
					'--vertical': this.props.vertical,
					'--horizontal': !this.props.vertical
				})}>
				<DropZoneWidget
					vertical={!this.props.vertical}
					disallow={!this.props.dropZoneAllowed(0)}
					dropped={model => {
						this.props.dropped(0, model);
					}}
					engine={this.props.engine}
					key="drop-first"
				/>
				{_.map(children, (model, index) => {
					return (
						<>
							{model}
							<DropZoneWidget
								key={`dropzone-${index}`}
								vertical={!this.props.vertical}
								disallow={!this.props.dropZoneAllowed(index + 1)}
								dropped={droppedModel => {
									this.props.dropped(index + 1, droppedModel);
								}}
								engine={this.props.engine}
							/>
						</>
					);
				})}
			</div>
		);
	}
}
