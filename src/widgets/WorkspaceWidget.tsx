import * as React from 'react';
import { WorkspaceNodeModel } from '../entities/tray/WorkspaceNodeModel';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import { PanelWidget } from '../entities/panel/PanelWidget';
import * as PropTypes from 'prop-types';
import { StandardLayoutWidget } from './layouts/StandardLayoutWidget';
import styled from '@emotion/styled';
import { DividerContext } from './dropzone/DropzoneDividerWidget';

export interface WorkspaceWidgetProps {
	model: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	dividerColor?: string;
	dividerColorActive?: string;
}

export interface WorkspaceWidgetContext {
	workspace: WorkspaceWidget;
}

namespace S {
	export const Container = styled.div`
		display: flex;
		height: 100%;
		position: relative;
	`;

	export const Floating = styled.div`
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
	`;
}

export class WorkspaceWidget extends React.Component<WorkspaceWidgetProps> {
	listener: () => any;
	timerListener: any;
	floatingContainer: HTMLDivElement;
	forwardRef: React.RefObject<HTMLDivElement>;

	static childContextTypes = {
		workspace: PropTypes.any
	};

	constructor(props) {
		super(props);
		this.forwardRef = React.createRef();
	}

	componentDidMount() {
		this.listener = this.props.engine.registerListener({
			repaint: () => {
				this.forceUpdate();
			}
		});
	}

	componentDidUpdate(prevProps: Readonly<WorkspaceWidgetProps>, prevState: Readonly<any>, snapshot?: any): void {
		if (this.props.engine.repainting) {
			this.props.engine.repainting = false;
		}
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

	getWorkspaceDimensions(): Partial<ClientRect> {
		return this.forwardRef.current.getBoundingClientRect();
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
			<DividerContext.Provider
				value={{
					hint: this.props.dividerColor,
					active: this.props.dividerColorActive
				}}>
				<S.Container
					ref={this.forwardRef}
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
					<S.Floating
						ref={ref => {
							this.floatingContainer = ref;
						}}
					/>
				</S.Container>
			</DividerContext.Provider>
		);
	}
}
