import * as React from 'react';
import { WorkspaceNodeModel } from '../models/node/WorkspaceNodeModel';
import { WorkspaceEngine } from '../WorkspaceEngine';
import { PanelWidget } from './PanelWidget';
import * as PropTypes from 'prop-types';
import { BaseWidget, BaseWidgetProps } from '@projectstorm/react-core';
import { StandardLayoutWidget } from './layouts/StandardLayoutWidget';

export interface WorkspaceWidgetProps extends BaseWidgetProps {
	model: WorkspaceNodeModel;
	engine: WorkspaceEngine;
}

export interface WorkspaceWidgetContext {
	workspace: WorkspaceWidget;
}

export class WorkspaceWidget extends BaseWidget<WorkspaceWidgetProps> {
	listener: () => any;
	timerListener: any;
	floatingContainer: HTMLDivElement;

	static childContextTypes = {
		workspace: PropTypes.any
	};

	constructor(props: WorkspaceWidgetProps) {
		super('srw-workspace', props);
		this.state = {};
	}

	componentDidMount() {
		this.listener = this.props.engine.registerListener({
			repaint: () => {
				this.forceUpdate();
			}
		});
	}

	componentDidUpdate(prevProps: Readonly<WorkspaceWidgetProps>, prevState: Readonly<any>, snapshot?: any): void {
		if (this.props.engine.fireModelUpdateEvent) {
			this.props.engine._fireModelUpdated();
		}
	}

	componentWillUnmount() {
		this.listener && this.listener();
	}

	isRight(element: HTMLDivElement) {
		return this.getRelativePosition(element).left > this.floatingContainer.offsetWidth / 2;
	}

	getRelativePosition(element: HTMLElement): Partial<ClientRect> {
		let rect = element.getBoundingClientRect();
		let rect2 = this.floatingContainer.getBoundingClientRect();
		return {
			top: rect.top - rect2.top,
			left: rect.left - rect2.left,
			right: rect.right - rect2.right,
			bottom: rect.bottom - rect2.bottom
		};
	}

	getChildContext(): WorkspaceWidgetContext {
		return { workspace: this };
	}

	render() {
		return (
			<div
				{...this.getProps()}
				onDragOver={event => {
					if (this.timerListener) {
						clearTimeout(this.timerListener);
						this.timerListener = null;
					}

					this.timerListener = setTimeout(() => {
						this.props.engine.setDraggingNode(null);
					}, 200);

					if (this.props.engine.draggingID) {
						return;
					}
					let id = this.props.engine.getDropEventModelID(event);
					this.props.engine.setDraggingNode(id);
				}}>
				{this.props.engine.fullscreenModel ? (
					<PanelWidget expand={true} model={this.props.engine.fullscreenModel} engine={this.props.engine} />
				) : (
					<StandardLayoutWidget node={this.props.model} engine={this.props.engine} />
				)}
				<div
					className={this.bem('__floating')}
					ref={ref => {
						this.floatingContainer = ref;
					}}
				/>
			</div>
		);
	}
}
