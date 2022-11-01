import { WorkspaceModel } from '../../core-models/WorkspaceModel';
import * as React from 'react';
import { useResizeObserver } from './useResizeObserver';
import { useEffect } from 'react';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface UseModelElementProps {
	model: WorkspaceModel;
	engine: WorkspaceEngine;
}

export const useModelElement = (props: UseModelElementProps) => {
	const ref = React.useRef<HTMLDivElement>();
	useEffect(() => {
		let l2 = null;
		const l1 = props.engine.registerListener(
			{
				layoutInvalidated: () => {
					// wait for a repaint
					l2 = props.engine.registerListener({
						layoutRepainted: () => {
							l2();
							l2 = null;
							const dims = ref.current.getBoundingClientRect();
							props.model.r_dimensions.update(dims);
						}
					});
				}
			},
			{
				model: props.model.id,
				type: 'useModelElement'
			}
		);

		return () => {
			l1();
			l2?.();
		};
	}, []);
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
