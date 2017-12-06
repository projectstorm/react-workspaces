import * as React from "react";
import {WorkspaceNodeModel} from "../models/WorkspaceNodeModel";
import {WorkspaceEngine} from "../WorkspaceEngine";
import {StandardLayoutWidget} from "./layouts/StandardLayoutWidget";
import {MicroLayoutWidget} from "./layouts/MicroLayoutWidget";
import {ContainerWidget} from "./ContainerWidget";
import {DraggableWidget} from "./DraggableWidget";

export interface TrayWidgetProps {
	node: WorkspaceNodeModel;
	engine: WorkspaceEngine;
	root?: boolean;
}

export interface TrayWidgetState {
}

export class TrayWidget extends React.Component<TrayWidgetProps, TrayWidgetState> {

	constructor(props: TrayWidgetProps) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className={"srw-tray srw-tray--" + (this.props.node.expand && this.props.node.mode === 'expand' ? 'expand' : 'collapse')}>
				{
					!this.props.root &&
						<DraggableWidget model={this.props.node} engine={this.props.engine} className="srw-tray__title" {...{onDoubleClick: () => {
							this.props.node.setMode(this.props.node.mode === 'micro' ? 'expand' : 'micro');
							this.props.engine.fireRepaintListeners();
						}}}>
							<div className="srw-tray__toggle fa fa-bars" onClick={() => {
								this.props.node.setMode(this.props.node.mode === 'micro' ? 'expand' : 'micro');
								this.props.engine.fireRepaintListeners();
							}} />
						</DraggableWidget>
				}
				{
					this.props.node.mode === 'micro' ?
						<MicroLayoutWidget node={this.props.node} engine={this.props.engine}/>:
						<StandardLayoutWidget node={this.props.node} engine={this.props.engine} />
				}
				{
					!this.props.root && (this.props.node.vertical ?
						<ContainerWidget engine={this.props.engine} model={this.props.node} hide={['top','bottom']} />:
						<ContainerWidget engine={this.props.engine} model={this.props.node} hide={['left','right']} />)
				}
			</div>
		);
	}
}
