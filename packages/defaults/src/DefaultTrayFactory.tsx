import * as React from 'react';
import styled from '@emotion/styled';
import { WorkspaceTrayFactory, WorkspaceTrayModel, WorkspaceTrayMode } from '@projectstorm/react-workspaces-model-tray';
import { WorkspaceModelFactoryEvent } from '@projectstorm/react-workspaces-core';

namespace S {
	export const Tray = styled.div`
		height: 15px;
		background: mediumpurple;
	`;
}

export class DefaultTrayFactory extends WorkspaceTrayFactory {
	generateTrayHeader(event: WorkspaceModelFactoryEvent<WorkspaceTrayModel>): JSX.Element {
		return (
			<S.Tray
				onDoubleClick={() => {
					event.model.setMode(
						event.model.mode === WorkspaceTrayMode.NORMAL ? WorkspaceTrayMode.COLLAPSED : WorkspaceTrayMode.NORMAL
					);
				}}
			/>
		);
	}
}
