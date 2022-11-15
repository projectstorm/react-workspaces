import * as React from 'react';
import styled from '@emotion/styled';
import { Alignment, Corner, DimensionTrackingWidget } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeCornerWidget } from './FloatingWindowResizeCornerWidget';
import { FloatingWindowResizeEdgeWidget } from './FloatingWindowResizeEdgeWidget';

export interface FloatingWindowResizeLayerWidgetProps {
	window: FloatingWindowModel;
}

export const FloatingWindowResizeLayerWidget: React.FC<FloatingWindowResizeLayerWidgetProps> = (props) => {
	return (
		<DimensionTrackingWidget dimension={props.window.dimension}>
			<S.Relative>
				<FloatingWindowResizeEdgeWidget window={props.window} alignment={Alignment.LEFT} />
				<FloatingWindowResizeEdgeWidget window={props.window} alignment={Alignment.TOP} />
				<FloatingWindowResizeEdgeWidget window={props.window} alignment={Alignment.BOTTOM} />
				<FloatingWindowResizeEdgeWidget window={props.window} alignment={Alignment.RIGHT} />
				<FloatingWindowResizeCornerWidget window={props.window} corner={Corner.TOP_LEFT} />
				<FloatingWindowResizeCornerWidget window={props.window} corner={Corner.TOP_RIGHT} />
				<FloatingWindowResizeCornerWidget window={props.window} corner={Corner.BOTTOM_RIGHT} />
				<FloatingWindowResizeCornerWidget window={props.window} corner={Corner.BOTTOM_LEFT} />
			</S.Relative>
		</DimensionTrackingWidget>
	);
};

namespace S {
	export const Relative = styled.div`
		position: relative;
		height: 100%;
		width: 100%;
	`;
}
