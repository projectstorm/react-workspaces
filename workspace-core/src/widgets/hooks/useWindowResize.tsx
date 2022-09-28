import * as React from 'react';
import { useEffect } from 'react';

export interface UseResizeObserverProps {
	resized: () => any;
}

export const useWindowResize = (props: UseResizeObserverProps) => {
	useEffect(() => {
		const listener = () => {
			props.resized();
		};
		window.addEventListener('resize', listener);
		return () => {
			window.removeEventListener('resize', listener);
		};
	}, []);
};
