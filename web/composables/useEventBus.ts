export const useEventBus = {
	on(event: string, callback: (...args: any[]) => void, autoUnmount = true) {
		const { $eventBus } = useNuxtApp();
		$eventBus.on(event, callback);

		if (!autoUnmount) return;

		onBeforeUnmount(() => $eventBus.off(event, callback));
	},

	off(event: string, callback?: (...args: any[]) => void) {
		const { $eventBus } = useNuxtApp();
		$eventBus.off(event, callback);
	},

	emit(event: string, ...args: any[]) {
		const { $eventBus } = useNuxtApp();
		$eventBus.emit(event, args);
	}
};
