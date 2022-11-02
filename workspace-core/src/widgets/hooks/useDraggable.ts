import * as React from 'react';
import { useEffect } from 'react';

export interface UseDraggableProps<T extends { [key: string]: any }> {
	forwardRef: React.RefObject<HTMLDivElement>;
	encode: () => T;
}

export const useDraggable = <T>(props: UseDraggableProps<T>) => {
	useEffect(() => {
		const dragStart = (event: DragEvent) => {
			const object = props.encode();
			if (!object) {
				return;
			}

			// show copy
			if (event.altKey) {
				event.dataTransfer.effectAllowed = 'copy';
			}

			// encode all mime types
			for (let key in object) {
				event.dataTransfer.setData(key, JSON.stringify(object));
			}
		};
		const dragEnd = async (event: DragEvent) => {};

		props.forwardRef.current.addEventListener('dragstart', dragStart);
		props.forwardRef.current.addEventListener('dragend', dragEnd);

		return () => {
			props.forwardRef.current?.removeEventListener('dragstart', dragStart);
			props.forwardRef.current?.removeEventListener('dragend', dragEnd);
		};
	}, [props.forwardRef]);
};

export const DraggableWidget = <T>(props: React.PropsWithChildren<UseDraggableProps<T>>) => {
	useDraggable(props);
	return props.children as JSX.Element;
};
