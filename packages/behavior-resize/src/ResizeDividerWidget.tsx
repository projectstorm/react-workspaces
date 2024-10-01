import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Alignment,
  DimensionTrackingWidget,
  getAlignmentInverted,
  ResizeDivision,
  useMouseDragDistance,
  UseMouseDragDistanceProps,
  WorkspaceEngine,
  WorkspaceModel,
  WorkspaceNodeModel
} from '@projectstorm/react-workspaces-core';

export interface ResizeDividerWidgetProps {
  dividerContainer: ResizeDivision;
  engine: WorkspaceEngine;
  parent: WorkspaceNodeModel;
}

const isAligned = (divider: ResizeDivision, aligned: Alignment, parent: WorkspaceNodeModel) => {
  let beforeDirective = parent.shouldChildExpand(divider.before);
  const afterDirective = parent.shouldChildExpand(divider.after);
  if (beforeDirective !== afterDirective) {
    return false;
  }
  let before = divider.before;
  do {
    before = before.getSibling(aligned);
    if (!before) {
      return true;
    }
    let beforeDirective = parent.shouldChildExpand(before);
    if (beforeDirective) {
      return false;
    }
  } while (before);
  return false;
};

const getAvailableElement = (model: WorkspaceModel, aligned: Alignment) => {
  let width = [Alignment.LEFT, Alignment.RIGHT].indexOf(aligned) !== -1;
  const sibling = model.getSibling(aligned);
  if (!sibling) {
    return model;
  }
  if (
    width &&
    [model.size.width, model.minimumSize.width, model.maximumSize.width].every((v, index, arr) => v === arr[0])
  ) {
    return getAvailableElement(sibling, aligned);
  }
  if (
    !width &&
    [model.size.height, model.minimumSize.height, model.maximumSize.height].every((v, index, arr) => v === arr[0])
  ) {
    return getAvailableElement(sibling, aligned);
  }
  return model;
};

const getResizeStrategy = (
  divider: ResizeDivision,
  parent: WorkspaceNodeModel
): Pick<UseMouseDragDistanceProps, 'startMove' | 'moved'> => {
  let sizeSnapshot = new Map<WorkspaceModel, number>();

  const setSize = (model: WorkspaceModel, val: number) => {
    if (divider.vertical) {
      model.setWidth(val);
    } else {
      model.setHeight(val);
    }
  };

  return {
    startMove: () => {
      sizeSnapshot = new Map(
        parent.children.map((c) => {
          if (parent.vertical) {
            return [c, c.size.height];
          }
          return [c, c.size.width];
        })
      );
    },
    moved: ({ distanceX, distanceY }) => {
      const distance = divider.vertical ? distanceX : distanceY;
      const alignment = divider.vertical ? Alignment.LEFT : Alignment.TOP;

      let { before, after } = divider;

      // shrink|expand OR left aligned
      if (
        (!parent.shouldChildExpand(before) && parent.shouldChildExpand(after)) ||
        isAligned(divider, alignment, parent)
      ) {
        before = getAvailableElement(before, alignment);
        setSize(before, sizeSnapshot.get(before) + distance);
      }
      // expand|shrink OR right aligned
      if (
        (parent.shouldChildExpand(before) && !parent.shouldChildExpand(after)) ||
        !isAligned(divider, alignment, parent)
      ) {
        after = getAvailableElement(after, getAlignmentInverted(alignment));
        setSize(after, sizeSnapshot.get(after) - distance);
      }
      // shrink|shrink
      else {
        setSize(before, sizeSnapshot.get(before) + distance);
      }
    }
  };
};

export const ResizeDividerWidget: React.FC<ResizeDividerWidgetProps> = (props) => {
  const container = props.dividerContainer.dimensions;
  const vertical = props.dividerContainer.vertical;
  const ref = useRef<HTMLDivElement>();
  const [strategy] = useState(() => {
    return getResizeStrategy(props.dividerContainer, props.parent);
  });

  useEffect(() => {
    return props.engine.registerListener({
      layoutInvalidated: () => {
        props.dividerContainer.dimensions.invalidate();
      }
    });
  }, []);
  useMouseDragDistance({
    forwardRef: ref,
    ...strategy
  });

  return (
    <S.DimensionTracker dimension={container}>
      <S.Container
        onMouseEnter={() => {
          container.setHover(true);
        }}
        onMouseLeave={() => {
          container.setHover(false);
        }}
        onMouseDown={() => {
          let l;
          l = () => {
            container.setActive(false);
            window.removeEventListener('mouseup', l);
          };
          window.addEventListener('mouseup', l);
          container.setActive(true);
        }}
        ref={ref}
        vertical={vertical}
      ></S.Container>
    </S.DimensionTracker>
  );
};
namespace S {
  export const DimensionTracker = styled(DimensionTrackingWidget)``;
  const INSETS = 2;

  export const Container = styled.div<{ vertical: boolean }>`
    pointer-events: all;
    cursor: ${(p) => (p.vertical ? 'col-resize' : 'row-resize')};
    position: absolute;
    top: -${INSETS}px;
    left: -${INSETS}px;
    bottom: -${INSETS}px;
    right: -${INSETS}px;
    user-select: none;
  `;
}
