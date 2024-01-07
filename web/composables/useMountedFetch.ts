export function useMountedFetch(callback: () => void) {
	onMounted(() => nextTick(callback));
}
