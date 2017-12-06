import * as React from "react";

export interface PlaceholderContentWidgetProps {
}

export interface PlaceholderContentWidgetState {
}

export class PlaceholderContentWidget extends React.Component<PlaceholderContentWidgetProps, PlaceholderContentWidgetState> {

  constructor(props: PlaceholderContentWidgetProps) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="srw-demo-placeholder">
        {
            this.props.children || "Demo Content"
        }
      </div>
    );
  }
}
