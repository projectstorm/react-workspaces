import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '@projectstorm/react-workspaces-model-floating-window/dist';

export interface DefaultFloatingWindowWidgetProps {
	model: FloatingWindowModel;
	engine: WorkspaceEngine;
	titlebar: JSX.Element;
	content: JSX.Element;
}

export const DefaultFloatingWindowWidget: React.FC<DefaultFloatingWindowWidgetProps> = (props) => {
	return (
		<S.Container>
			{props.titlebar}
			{props.content}
		</S.Container>
	);
};
namespace S {
	export const Container = styled.div`
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
		pointer-events: all;
		border: solid 1px rgb(10, 10, 10);
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	`;
}
