import * as React from 'react';
import { useEffect } from 'react';

export type MousePosition = {
	clientX: number;
	clientY: number;
};

export interface UseDroppableOptions<T extends { [key: string]: any }> {
	dropped?: (entity: T, traits: { position: MousePosition; isCopy: boolean }) => any;
	acceptedTypes: (keyof T)[];
	forwardRef: React.RefObject<HTMLDivElement>;
}

export const useDroppable = <T>(props: UseDroppableOptions<T>) => {
	useEffect(() => {
		const dragOver = (event: DragEvent) => {
			let found = false;
			for (let i = 0; i < event.dataTransfer.types.length; ++i) {
				// allow the effect
				if ((props.acceptedTypes as string[]).indexOf(event.dataTransfer.types[i]) !== -1) {
					found = true;
				}
			}

			if (!found) {
				return;
			}

			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
		};
		const drop = async (event: DragEvent) => {
			let res = {};
			for (let type of props.acceptedTypes) {
				let data = event.dataTransfer.getData(type as string);
				try {
					res[type as string] = JSON.parse(data) as T;
				} catch (ex) {
					console.warn(`Failed to deserialize draggable object`, ex);
				}
			}
			props.dropped(res as T, {
				position: event,
				isCopy: event.dataTransfer.effectAllowed === 'copy'
			});
		};

		props.forwardRef.current.addEventListener('dragover', dragOver);
		props.forwardRef.current.addEventListener('drop', drop);

		return () => {
			props.forwardRef.current?.removeEventListener('dragover', dragOver);
			props.forwardRef.current?.removeEventListener('drop', drop);
		};
	}, [props.forwardRef]);
};
