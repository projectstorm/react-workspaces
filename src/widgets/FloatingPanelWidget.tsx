import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PanelWidget } from '../entities/panel/PanelWidget';
import { WorkspaceEngine } from '../core/WorkspaceEngine';
import * as PropTypes from 'prop-types';
import { WorkspaceModel } from '../core-models/WorkspaceModel';
import styled from '@emotion/styled';

export interface FloatingPanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	relativeElement: HTMLDivElement;
}

namespace S {
	export const Container = styled.div`
		position: absolute;
		background-color: black;
		pointer-events: all;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		transition: top 0.3s, left 0.3s;
	`;
}

export class FloatingPanelWidget extends React.Component<FloatingPanelWidgetProps> {
	static contextTypes = {
		workspace: PropTypes.any
	};

	listener: any;

	componentWillUnmount(): void {
		if (this.listener) {
			window.removeEventListener('resize', this.listener);
		}
	}

	componentDidMount(): void {
		this.listener = () => {
			this.forceUpdate();
		};
		window.addEventListener('resize', this.listener);
	}

	getContent() {
		let relativePosition = this.context.workspace.getRelativePosition(this.props.relativeElement);

		let style: any = {
			top: relativePosition.top
		};
		if (this.context.workspace.isRight(this.props.relativeElement)) {
			style['right'] = this.context.workspace.floatingContainer.offsetWidth - relativePosition.left;
		} else {
			style['left'] = relativePosition.left + this.props.relativeElement.offsetWidth;
		}

		return (
			<S.Container style={style}>
				<PanelWidget model={this.props.model} engine={this.props.engine} />
			</S.Container>
		);
	}

	render() {
		return this.props.relativeElement && this.context.workspace
			? ReactDOM.createPortal(this.getContent(), this.context.workspace.floatingContainer)
			: null;
	}
}
