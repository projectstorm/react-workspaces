import {WorkspacePanelFactory} from "../WorkspacePanelFactory";
import {DefaultWorkspacePanelModel} from "./DefaultWorkspacePanelModel";
import * as React from "react";

export class DefaultWorkspacePanelFactory extends WorkspacePanelFactory<DefaultWorkspacePanelModel> {

	constructor() {
		super('default');
	}

	generatePanelTitle(model: DefaultWorkspacePanelModel): JSX.Element {
		return (
			<div className="srw-default__title">{model.displayName}</div>
		);
	}

	generatePanelContent(model: DefaultWorkspacePanelModel): JSX.Element {
		return (
			<div className="srw-default__content">{model.getContent()}</div>
		);
	}

	generatePanelTab(model: DefaultWorkspacePanelModel, selected: boolean): JSX.Element {
		return (
			<div className={"srw-default__tab " + (selected ? "srw-default--selected" : '')}>{model.displayName}</div>
		);
	}

	generateMicroButton(model: DefaultWorkspacePanelModel, selected: boolean): JSX.Element {
		return (
			<div className={"srw-default__micro"+(selected?' srw-default--selected':'')}>
				<div className={"fa "+model.icon} />
			</div>
		)
	}
}
