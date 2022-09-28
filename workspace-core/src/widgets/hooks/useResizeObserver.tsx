import * as React from 'react';
import { DimensionContainer } from '../../core/DimensionContainer';
import { useCallback, useEffect } from 'react';

export interface UseResizeObserverProps {
	dimension: DimensionContainer;
	forwardRef: React.RefObject<HTMLDivElement>;
}

export const useResizeObserver = (props: UseResizeObserverProps) => {
	const update = useCallback(() => {
		let dims = props.forwardRef.current.getBoundingClientRect();
		props.dimension.update(dims);
	}, []);
	useEffect(() => {
		update();
		const resizeObserver = new ResizeObserver(() => {
			update();
		});
		resizeObserver.observe(props.forwardRef.current);
		return () => {
			resizeObserver.unobserve(props.forwardRef.current);
			resizeObserver.disconnect();
		};
	}, []);
};
