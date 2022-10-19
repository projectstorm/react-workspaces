import * as React from 'react';
import { DimensionContainer } from '../../core/DimensionContainer';
import { useCallback, useEffect } from 'react';
import { useWindowResize } from './useWindowResize';

export interface UseResizeObserverProps {
	dimension: DimensionContainer;
	forwardRef: React.RefObject<HTMLDivElement>;
}

export const useResizeObserver = (props: UseResizeObserverProps) => {
	const update = useCallback(() => {
		let dims = props.forwardRef.current.getBoundingClientRect();
		props.dimension.update(dims);
	}, []);

	useWindowResize({
		resized: update
	});

	useEffect(() => {
		update();
		const resizeObserver = new ResizeObserver(() => {
			update();
		});
		resizeObserver.observe(props.forwardRef.current);
		return () => {
			if (props.forwardRef.current) {
				resizeObserver.unobserve(props.forwardRef.current);
			}
			resizeObserver.disconnect();
		};
	}, []);
};
