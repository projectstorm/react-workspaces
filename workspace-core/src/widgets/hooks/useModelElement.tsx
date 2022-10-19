import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as React from 'react';
import { useResizeObserver } from './useResizeObserver';
import { useEffect } from 'react';

export interface UseModelElementProps {
	model: WorkspaceModel;
}

export const useModelElement = (props: UseModelElementProps) => {
	const ref = React.useRef<HTMLDivElement>();
	useResizeObserver({
		forwardRef: ref,
		dimension: props.model.r_dimensions
	});
	useEffect(() => {
		props.model.setVisible(true);
		return () => {
			props.model.setVisible(false);
		};
	}, []);
	return ref;
};
