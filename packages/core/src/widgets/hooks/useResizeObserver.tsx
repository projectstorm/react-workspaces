import * as React from 'react';
import * as _ from 'lodash';
import { DimensionContainer } from '../../core/DimensionContainer';
import { useCallback, useEffect } from 'react';
import { useWindowResize } from './useWindowResize';

export interface UseResizeObserverProps {
	dimension: DimensionContainer;
	forwardRef: React.RefObject<HTMLDivElement>;
}

export const useResizeObserver = (props: UseResizeObserverProps) => {
	const update = useCallback(
		_.debounce(() => {
			if (!props.forwardRef.current) {
				return;
			}
			let dims = props.forwardRef.current.getBoundingClientRect();
			props.dimension.update(dims);
		}, 10),
		[]
	);

	useEffect(() => {
		return props.dimension.registerListener({
			invalidate: () => {
				update();
			}
		});
	}, []);

	useWindowResize({
		resized: update
	});

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			() => {
				update();
			},
			{
				root: document.body
			}
		);
		intersectionObserver.observe(props.forwardRef.current);
		return () => {
			if (props.forwardRef.current) {
				intersectionObserver.unobserve(props.forwardRef.current);
			}
			intersectionObserver.disconnect();
		};
	}, []);

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
