import {WorkspacePanelFactory} from "../WorkspacePanelFactory";
import {DefaultWorkspacePanelModel} from "./DefaultWorkspacePanelModel";
import * as React from "react";

export class DefaultWorkspacePanelFactory extends WorkspacePanelFactory<DefaultWorkspacePanelModel> {

	constructor() {
		super('default');
	}

	generatePanelTitle(event): JSX.Element {
		return (
			<div className="srw-default__title">{event.model.displayName}</div>
		);
	}

	generatePanelContent(event): JSX.Element {
		return (
			<div className="srw-default__content">{event.model.getContent()}</div>
		);
	}

	generatePanelTab(event): JSX.Element {
		return (
			<div className={"srw-default__tab " + (event.selected ? "srw-default--selected" : '')}>{event.model.displayName}</div>
		);
	}

	generateMicroButton(event): JSX.Element {
		return (
			<div className={"srw-default__micro"+(event.selected?' srw-default--selected':'')}>
				<div className={"fa "+event.model.icon} />
			</div>
		)
	}
}
