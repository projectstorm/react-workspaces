import * as React from 'react';
import { useEffect } from 'react';
import { DimensionContainer } from '../../core/dimensions/DimensionContainer';

export interface UseScrollObserverProps {
	dimension: DimensionContainer;
	forwardRef: React.RefObject<HTMLDivElement>;
}

export const useScrollObserver = (props: UseScrollObserverProps) => {
	useEffect(() => {
		const cb = () => {
			props.dimension.invalidate();
		};
		props.forwardRef.current.addEventListener('scroll', cb);
		return () => {
			props.forwardRef.current?.removeEventListener('scroll', cb);
		};
	}, []);
};
