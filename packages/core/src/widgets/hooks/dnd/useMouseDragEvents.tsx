import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';

export const DropZoneDragContext =
	React.createContext<{
		increment: () => any;
		decrement: () => any;
	}>(null);

export interface UseMouseDragEventsProps {
	forwardRef: React.RefObject<HTMLDivElement>;
	mouseEnter?: () => any;
	mouseExit?: () => any;
}

export const useMouseDragEvents = (props: UseMouseDragEventsProps) => {
	const c = useContext(DropZoneDragContext);
	useEffect(() => {
		const dragEnter = (event: DragEvent) => {
			c.increment();
			props.mouseEnter?.();
		};

		const dragLeave = () => {
			c.decrement();
			props.mouseExit?.();
		};

		props.forwardRef.current.addEventListener('dragenter', dragEnter);
		props.forwardRef.current.addEventListener('dragleave', dragLeave);
		props.forwardRef.current.addEventListener('drop', dragLeave);

		return () => {
			props.forwardRef.current?.removeEventListener('dragenter', dragEnter);
			props.forwardRef.current?.removeEventListener('dragleave', dragLeave);
			props.forwardRef.current?.removeEventListener('drop', dragLeave);
		};
	}, []);
};

const UseMouseDragEventsRootWidgetInner: React.FC<React.PropsWithChildren<UseMouseDragEventsProps>> = (props) => {
	useMouseDragEvents({
		forwardRef: props.forwardRef
	});
	return props.children as any;
};

export const UseMouseDragEventsRootWidget: React.FC<React.PropsWithChildren<UseMouseDragEventsProps>> = (props) => {
	const dragCount = useRef(0);
	return (
		<DropZoneDragContext.Provider
			value={{
				increment: () => {
					dragCount.current = dragCount.current + 1;
					if (dragCount.current > 0) {
						props.mouseEnter?.();
					}
				},
				decrement: () => {
					dragCount.current = dragCount.current - 1;
					if (dragCount.current === 0) {
						props.mouseExit?.();
					}
				}
			}}
		>
			<UseMouseDragEventsRootWidgetInner {...props}>{props.children}</UseMouseDragEventsRootWidgetInner>
		</DropZoneDragContext.Provider>
	);
};
