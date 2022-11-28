import * as React from 'react';
import styled from '@emotion/styled';
import { Alignment, Corner, DimensionTrackingWidget } from '@projectstorm/react-workspaces-core';
import { FloatingWindowModel } from '../../core/FloatingWindowModel';
import { FloatingWindowResizeCornerWidget } from './FloatingWindowResizeCornerWidget';
import { FloatingWindowResizeEdgeWidget } from './FloatingWindowResizeEdgeWidget';

export interface FloatingWindowResizeLayerWidgetProps {
  window: FloatingWindowModel;
  debug?: boolean;
  toggleAnimation: (animate: boolean) => any;
}

export const FloatingWindowResizeLayerWidget: React.FC<FloatingWindowResizeLayerWidgetProps> = (props) => {
  return (
    <DimensionTrackingWidget dimension={props.window.dimension}>
      <S.Relative>
        <FloatingWindowResizeEdgeWidget {...props} alignment={Alignment.LEFT} />
        <FloatingWindowResizeEdgeWidget {...props} alignment={Alignment.TOP} />
        <FloatingWindowResizeEdgeWidget {...props} alignment={Alignment.BOTTOM} />
        <FloatingWindowResizeEdgeWidget {...props} alignment={Alignment.RIGHT} />
        <FloatingWindowResizeCornerWidget {...props} corner={Corner.TOP_LEFT} />
        <FloatingWindowResizeCornerWidget {...props} corner={Corner.TOP_RIGHT} />
        <FloatingWindowResizeCornerWidget {...props} corner={Corner.BOTTOM_RIGHT} />
        <FloatingWindowResizeCornerWidget {...props} corner={Corner.BOTTOM_LEFT} />
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
