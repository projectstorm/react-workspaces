import * as React from 'react';
import { useEffect } from 'react';
import { log, MousePosition } from '../../../core/tools';

export interface UseDroppableOptions<T extends { [key: string]: any }> {
  dropped?: (entity: T, traits: { position: MousePosition; isCopy: boolean }) => any;
  forwardRef: React.RefObject<HTMLDivElement>;
}

export const useDroppable = <T>(props: UseDroppableOptions<T>) => {
  useEffect(() => {
    const drop = async (event: DragEvent) => {
      let res = {};
      for (let type of event.dataTransfer.types) {
        let data = event.dataTransfer.getData(type as string);
        try {
          res[type as string] = JSON.parse(data) as T;
        } catch (ex) {
          console.warn(`Failed to deserialize draggable object`, ex);
        }
      }
      log(`dropped data:`, res);
      props.dropped(res as T, {
        position: event,
        isCopy: event.dataTransfer.effectAllowed === 'copy'
      });
    };

    props.forwardRef.current.addEventListener('drop', drop);

    return () => {
      props.forwardRef.current?.removeEventListener('drop', drop);
    };
  }, [props.forwardRef]);
};
