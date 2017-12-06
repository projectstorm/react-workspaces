import * as React from "react";

export interface BemWidgetProps {
	/**
	 * Override the base class name
	 */
	baseClass?: string;
	/**
	 * append additional classes
	 */
	className?: string;
}

/**
 * Helper widget for creating bem classes.
 * @author Dylan Vorster
 */
export class BemWidget<P extends BemWidgetProps, S> extends React.Component<P, S> {

	className: string;

	constructor(props: P, className: string,) {
		super(props);
		this.className = className;
	}

	bem(selector?: string) {
		return " " + (this.props.baseClass || this.className || "") + (selector || (" " + this.props.className));
	}
}
