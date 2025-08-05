import * as React from 'react';
import { useEffect } from 'react';
import { log } from '../../../core/tools';

export interface UseDraggableProps<T extends { [key: string]: any }> {
  forwardRef: React.RefObject<HTMLDivElement>;
  encode: () => T;
  dragend: (options: { copy: boolean; success: boolean }) => any;
}

export const useDraggable = <T>(props: UseDraggableProps<T>) => {
  useEffect(() => {
    const dragStart = (event: DragEvent) => {
      event.stopPropagation();
      const object = props.encode();
      if (!object) {
        return;
      }

      // show copy
      event.dataTransfer.dropEffect = 'none';
      if (event.altKey) {
        log(`dragging as a copy operation`);
        event.dataTransfer.effectAllowed = 'copy';
      } else {
        event.dataTransfer.effectAllowed = 'move';
      }

      // encode all mime types
      for (let key in object) {
        log(`setting up mime: ${key}`);
        event.dataTransfer.setData(key, JSON.stringify(object[key]));
      }
    };
    const dragEnd = async (event: DragEvent) => {
      if (event.dataTransfer.dropEffect === 'none') {
        props.dragend({
          copy: false,
          success: false
        });
        return;
      }
      props.dragend({
        copy: event.dataTransfer.dropEffect === 'copy',
        success: true
      });
    };

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
  return props.children as React.JSX.Element;
};
