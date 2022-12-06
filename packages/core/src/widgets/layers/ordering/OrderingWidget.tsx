import * as React from 'react';
import styled from '@emotion/styled';
import { OrderingLayer } from './OrderingLayer';
import { useEffect, useRef, useState } from 'react';
import { WorkspaceEngine } from '../../../core/WorkspaceEngine';
import { DimensionContainer } from '../../../core/dimensions/DimensionContainer';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { WorkspaceModel } from '../../../core-models/WorkspaceModel';

export interface OrderingWidgetZoneProps {
  index: number;
  layer: OrderingLayer;
  vertical: boolean;
  container: DimensionContainer;
  engine: WorkspaceEngine;
}

export const OrderingWidgetZone: React.FC<OrderingWidgetZoneProps> = (props) => {
  const [expand, setExpand] = useState(false);
  const ref = useRef<HTMLDivElement>();
  useResizeObserver({
    forwardRef: ref,
    dimension: props.container,
    ignoreDebounce: true,
    engine: props.engine
  });
  useEffect(() => {
    return props.layer.registerListener({
      enteredZone: (zone) => {
        props.container.invalidate();
        if (!expand && zone === props.index) {
          setExpand(true);
        } else {
          setExpand(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    const animationEnd = () => {
      props.layer.trackers.forEach((t) => {
        t.invalidate();
      });
    };
    ref.current.addEventListener('transitionend', animationEnd);
    return () => {
      ref.current?.removeEventListener('transitionend', animationEnd);
    };
  }, []);
  if (props.vertical) {
    return <S.ExpandVertical ref={ref} expand={expand} />;
  }
  return <S.ExpandHorizontal ref={ref} expand={expand} />;
};

export interface OrderedDropEvent {
  model: WorkspaceModel;
  index: number;
}

export interface OrderingWidgetProps {
  children: JSX.Element[];
  vertical: boolean;
  engine: WorkspaceEngine;
  dropped: (event: OrderedDropEvent) => any;
}

export const OrderingWidget: React.FC<OrderingWidgetProps> = (props) => {
  const [containers] = useState(() => {
    return props.children.map((c) => new DimensionContainer()).concat(new DimensionContainer());
  });
  const [layer] = useState(() => {
    return new OrderingLayer({
      trackers: containers
    });
  });
  useEffect(() => {
    const l1 = layer.registerListener({
      dropped: (model, index) => {
        props.dropped({
          index,
          model
        });
      }
    });
    props.engine.layerManager.addLayer(layer);
    return () => {
      l1();
      layer.remove();
    };
  }, []);
  return (
    <>
      <OrderingWidgetZone
        engine={props.engine}
        container={containers[0]}
        layer={layer}
        vertical={props.vertical}
        index={0}
      />
      {props.children.map((c, index: number) => {
        return (
          <React.Fragment key={containers[index + 1]?.id || `${index}`}>
            {c}
            {containers[index + 1] ? (
              <OrderingWidgetZone
                engine={props.engine}
                container={containers[index + 1]}
                layer={layer}
                vertical={props.vertical}
                index={index + 1}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};

export interface SmartOrderingWidgetProps extends OrderingWidgetProps {
  className?: any;
  forwardRef?: React.RefObject<HTMLDivElement>;
}

export const SmartOrderingWidget: React.FC<SmartOrderingWidgetProps> = (props) => {
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    return props.engine.registerListener({
      modelDragStart: () => {
        setDragging(true);
      },
      modelDragEnd: () => {
        setDragging(false);
      }
    });
  }, []);
  return (
    <S.Container className={props.className} ref={props.forwardRef}>
      {dragging ? (
        <OrderingWidget
          {...props}
          dropped={(event) => {
            // eagerly set to false so the smart zone unmounts
            props.dropped?.(event);
          }}
        />
      ) : (
        props.children
      )}
    </S.Container>
  );
};

namespace S {
  export const Container = styled.div``;

  export const ExpandHorizontal = styled.div<{ expand: boolean }>`
    width: ${(p) => (p.expand ? 40 : 0)}px;
    height: 100%;
    transition: width 0.3s;
    flex-shrink: 0;
  `;

  export const ExpandVertical = styled.div<{ expand: boolean }>`
    height: ${(p) => (p.expand ? 40 : 0)}px;
    width: 100%;
    transition: height 0.3s;
    flex-shrink: 0;
  `;
}
