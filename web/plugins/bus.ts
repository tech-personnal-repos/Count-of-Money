export default defineNuxtPlugin(() => {
	const all = new Map<string, Function[]>();

	return {
		provide: {
			eventBus: {
				all,

				on(type: string, handler: Function) {
					const handlers = all.get(type);

					if (handlers) handlers.push(handler);
					else all.set(type, [handler]);
				},

				off(type: string, handler?: Function) {
					const handlers = all.get(type);
					if (!handlers) return;

					const index = handler ? handlers.indexOf(handler) : -1;
					if (index > 0 && handler) handlers.splice(index, 1);
					else all.delete(type);
				},

				emit(type: string, payload: any[]) {
					const handlers = all.get(type);

					if (handlers) [...handlers].map(handler => handler(...payload));
				}
			}
		}
	};
});
