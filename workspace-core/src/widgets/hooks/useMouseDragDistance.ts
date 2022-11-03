import * as React from 'react';
import { useEffect } from 'react';

export interface MouseDragEvent {
	distanceX: number;
	distanceY: number;
	event: MouseEvent;
}

export interface UseMouseDragDistanceProps {
	forwardRef: React.RefObject<HTMLDivElement>;
	startMove?: () => any;
	endMove?: () => any;
	moved: (event: MouseDragEvent) => any;
}

export const useMouseDragDistance = (props: UseMouseDragDistanceProps) => {
	useEffect(() => {
		const mouseDown = (event: MouseEvent) => {
			props.startMove?.();
			const mouseMove = (event2: MouseEvent) => {
				props.moved({
					event: event2,
					distanceX: event2.clientX - event.clientX,
					distanceY: event2.clientY - event.clientY
				});
			};

			const mouseUp = () => {
				props.endMove?.();
				window.removeEventListener('mouseup', mouseUp);
				window.removeEventListener('mousemove', mouseMove);
			};

			window.addEventListener('mouseup', mouseUp);
			window.addEventListener('mousemove', mouseMove);
		};

		props.forwardRef.current.addEventListener('mousedown', mouseDown);

		return () => {
			props.forwardRef.current?.removeEventListener('mousedown', mouseDown);
		};
	}, []);
};
