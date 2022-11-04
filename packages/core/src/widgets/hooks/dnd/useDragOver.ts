import * as React from 'react';
import { useEffect } from 'react';

export interface useDragOverOptions {
	dragOver?: (types: readonly string[]) => any;
	acceptedTypes: string[];
	forwardRef: React.RefObject<HTMLDivElement>;
	/**
	 * Whether or not to accept the drag,
	 * set to false if you just want the data but don't want to accept the drag
	 */
	accept?: boolean;
}

export const useDragOver = (props: useDragOverOptions) => {
	useEffect(() => {
		const dragOver = (event: DragEvent) => {
			let found = false;
			for (let i = 0; i < event.dataTransfer.types.length; ++i) {
				// allow the effect if we find something that matches
				if (props.acceptedTypes.some((type) => event.dataTransfer.types[i].startsWith(type as string))) {
					found = true;
				}
			}

			if (!found) {
				return;
			}

			if (props.accept) {
				event.preventDefault();
			}
			// event.dataTransfer.dropEffect = 'move';
			props.dragOver?.(event.dataTransfer.types);
		};

		props.forwardRef.current.addEventListener('dragover', dragOver);

		return () => {
			props.forwardRef.current?.removeEventListener('dragover', dragOver);
		};
	}, [props.forwardRef]);
};
