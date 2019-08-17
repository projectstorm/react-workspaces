import * as React from 'react';
import * as _ from 'lodash';
import { WorkspaceEngine } from '../WorkspaceEngine';

export interface PerformanceWidgetProps {
	data: object;
	children: () => JSX.Element;
	engine: WorkspaceEngine;
}

export class PerformanceWidget extends React.Component<PerformanceWidgetProps> {
	shouldComponentUpdate(
		nextProps: Readonly<PerformanceWidgetProps>,
		nextState: Readonly<{}>,
		nextContext: any
	): boolean {
		if (!this.props.engine.repainting) {
			return true;
		}
		return !_.isEqual(this.props.data, nextProps.data);
	}

	render() {
		return this.props.children();
	}
}
