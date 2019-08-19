import { WorkspaceTrayFactory } from '../../src/entities/tray/WorkspaceTrayFactory';
import { GenerateEvent } from '../../src/core/WorkspaceFactory';
import { WorkspaceNodeModel } from '../../src/entities/tray/WorkspaceNodeModel';
import * as React from 'react';
import styled from "@emotion/styled";

namespace S{
	export const Tray = styled.div`
		height: 15px;
		background: mediumpurple;
	`;
}

export class DefaultTrayFactory extends WorkspaceTrayFactory {
	generateTrayHeader(event: GenerateEvent<WorkspaceNodeModel>): JSX.Element {
		return (
			<S.Tray
				onDoubleClick={() => {
					event.model.setMode(event.model.mode === 'micro' ? 'expand' : 'micro');
					event.engine.fireRepaintListeners();
				}}
			/>
		);
	}
}
