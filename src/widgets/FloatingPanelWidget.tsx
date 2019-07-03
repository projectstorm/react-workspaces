import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PanelWidget } from './PanelWidget';
import { WorkspaceEngine } from '../WorkspaceEngine';
import * as PropTypes from 'prop-types';
import { WorkspaceModel } from '../models/WorkspaceModel';

export interface FloatingPanelWidgetProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
	relativeElement: HTMLDivElement;
}


export class FloatingPanelWidget extends React.Component<FloatingPanelWidgetProps> {
	static contextTypes = {
		workspace: PropTypes.any
	};

	listener: any;

	componentWillUnmount(): void {
		if(this.listener){
			window.removeEventListener('resize', this.listener);
		}
	}

	componentDidMount(): void {
		this.listener = () => {
			this.forceUpdate()
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
			<div style={style} className="srw-floating-panel">
				<PanelWidget model={this.props.model} engine={this.props.engine} />
			</div>
		);
	}

	render() {
		return this.props.relativeElement && this.context.workspace
			? ReactDOM.createPortal(this.getContent(), this.context.workspace.floatingContainer)
			: null;
	}
}
