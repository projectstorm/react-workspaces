import * as React from "react";
import {WorkspaceModel, WorkspaceModelFactory} from "@projectstorm/react-workspaces-core";
import styled from "@emotion/styled";

/**
 * This model represents a panel in our workspace
 */
export class MyCustomPanelModel extends WorkspaceModel{

  constructor(name) {
    super('my-custom-model-type');
    this.name = name;
  }
}

/**
 * This factory describes how to create new custom panels when drag operations happen
 * as well as how to render the custom panel model
 */
export class MyCustomPanelModelFactory extends WorkspaceModelFactory{

  constructor() {
    super('my-custom-model-type');
  }

  generateContent({model}){
    return (<MyCustomPanelModelWidget model={model} />)
  }
}

const Panel = styled.div`
  border: solid 1px black;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

/**
 * This is the widget that gets rendered for the custom panel model
 */
export const MyCustomPanelModelWidget = (props) => {
  return (
    <Panel>{props.model.name}</Panel>
  )
}