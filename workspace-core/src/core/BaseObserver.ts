import { v1 } from 'uuid';

export interface BaseObserverInterface<T extends BaseListener> {
	registerListener(listener: Partial<T>): () => void;
}

export interface BaseListener {}

export class BaseObserver<T extends BaseListener> implements BaseObserverInterface<T> {
	protected listeners: { [id: string]: Partial<T> };

	constructor() {
		this.listeners = {};
	}

	registerListener(listener: Partial<T>): () => void {
		const id = v1();
		this.listeners[id] = listener;
		return () => {
			delete this.listeners[id];
		};
	}

	iterateListeners(cb: (listener: Partial<T>) => any) {
		for (let i in this.listeners) {
			cb(this.listeners[i]);
		}
	}
}
