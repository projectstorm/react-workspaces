import * as React from 'react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { DefaultWorkspacePanelModel } from '../panel/DefaultWorkspacePanelModel';

export interface DefaultPanelContentWidgetProps {
  model: DefaultWorkspacePanelModel;
}

export const Meta: React.FC<{ label: string; value: string }> = (props) => {
  return (
    <S.Meta>
      <S.MetaKey>{props.label}</S.MetaKey>
      <S.MetaValue>{props.value}</S.MetaValue>
    </S.Meta>
  );
};

export const DefaultPanelContentWidget: React.FC<DefaultPanelContentWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current.style.opacity = '1';
    const res = setTimeout(() => {
      ref.current.style.opacity = '0';
    }, 1000);
    return () => {
      clearTimeout(res);
    };
  });
  return (
    <S.Container>
      <Meta label="Title" value={props.model.displayName} />
      <Meta label="ID" value={props.model.id.substring(0, 7)} />
      <Meta label="Expand horizontal" value={props.model.expandHorizontal ? 'true' : 'false'} />
      <Meta label="Expand vertical" value={props.model.expandVertical ? 'true' : 'false'} />
      <S.Rendering ref={ref}>rendering</S.Rendering>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    flex-grow: 1;
  `;

  export const Meta = styled.div`
    display: flex;
    align-items: center;
    font-size: 11px;
  `;

  export const Rendering = styled.div`
    background: rgb(72, 41, 41);
    color: white;
    border-radius: 5px;
    font-size: 11px;
    padding: 2px 5px;
    display: inline-block;
  `;

  export const MetaKey = styled.div``;

  export const MetaValue = styled.div`
    font-weight: bold;
    padding-left: 5px;
  `;
}
