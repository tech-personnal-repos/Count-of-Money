export function watchOnce(
    source: any,
    cb: any,
    options?: { immediate?: boolean; deep?: true }
) {
    const stop = watch(
        source,
        (...args: any) => {
            nextTick(() => stop());
            return cb(...args);
        },
        options
    );
}
