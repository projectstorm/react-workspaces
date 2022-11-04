import * as React from 'react';
import { useEffect } from 'react';

export interface UseWindowResizeProps {
	resized: () => any;
}

export const useWindowResize = (props: UseWindowResizeProps) => {
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
