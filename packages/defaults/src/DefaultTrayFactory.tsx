import * as React from 'react';
import styled from '@emotion/styled';
import { GenerateEvent } from '@projectstorm/react-workspaces-core';
import { WorkspaceTrayFactory, WorkspaceTrayModel } from '@projectstorm/react-workspaces-model-tray';

namespace S {
	export const Tray = styled.div`
		height: 15px;
		background: mediumpurple;
	`;
}

export class DefaultTrayFactory extends WorkspaceTrayFactory {
	generateTrayHeader(event: GenerateEvent<WorkspaceTrayModel>): JSX.Element {
		return (
			<S.Tray
				onDoubleClick={() => {
					event.model.setMode(event.model.mode === 'micro' ? 'expand' : 'micro');
				}}
			/>
		);
	}
}
