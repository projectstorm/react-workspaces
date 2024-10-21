import * as React from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { WorkspaceNodeWidget } from './WorkspaceNodeWidget';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';
import { WorkspaceNodeFactory } from './WorkspaceNodeFactory';
import { ResizeDimensionContainer } from './ResizeDimensionContainer';
import { ExpandNodeModel } from './ExpandNodeModel';
import { useForceUpdate } from '../../widgets/hooks/useForceUpdate';

export interface ExpandNodeWidgetProps {
  engine: WorkspaceEngine;
  factory: WorkspaceNodeFactory;
  model: ExpandNodeModel;
  generateDivider?: (divider: ResizeDimensionContainer) => React.JSX.Element;
  className?: any;
}

export const ExpandNodeWidget: React.FC<ExpandNodeWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return props.model.registerListener({
      recomputed: () => {
        forceUpdate();
      }
    });
  }, []);
  return <S.WorkspaceNode {...props} computed_initial={props.model.computed_initial} />;
};
namespace S {
  export const WorkspaceNode = styled(WorkspaceNodeWidget)<{ computed_initial: boolean }>`
    opacity: ${(p) => (p.computed_initial ? 1 : 0)};
  `;
}
