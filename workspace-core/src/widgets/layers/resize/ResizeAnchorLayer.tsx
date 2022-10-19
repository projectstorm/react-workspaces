import * as React from 'react';
import { Layer } from '../LayerManager';
import styled from '@emotion/styled';

export class ResizeAnchorLayer extends Layer {
	renderLayer(): JSX.Element {
		return <ResizeAnchorLayerWidget />;
	}
}

export interface ResizeAnchorLayerWidgetProps {}
export const ResizeAnchorLayerWidget: React.FC<ResizeAnchorLayerWidgetProps> = (props) => {
	return <S.Container></S.Container>;
};

namespace S {
	export const Container = styled.div``;
}
