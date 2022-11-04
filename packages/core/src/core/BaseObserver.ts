import { v4 } from 'uuid';

export interface BaseObserverInterface<T extends BaseListener> {
	registerListener(listener: Partial<T>, meta?: any): () => void;
}

export interface BaseListener {}

export class BaseObserver<T extends BaseListener> implements BaseObserverInterface<T> {
	protected listeners: {
		[id: string]: {
			l: Partial<T>;
			meta: any;
		};
	};

	constructor() {
		this.listeners = {};
	}

	registerListener(listener: Partial<T>, meta?: any): () => void {
		const id = v4();
		this.listeners[id] = {
			l: listener,
			meta
		};
		return () => {
			delete this.listeners[id];
		};
	}

	iterateListeners(cb: (listener: Partial<T>) => any) {
		for (let i in this.listeners) {
			cb(this.listeners[i].l);
		}
	}
}
