export const useScreenStore = defineStore('screenStore', () => {
    const width = ref(Infinity);
    const height = ref(Infinity);
    const layout = ref(null as null | 'mobile' | 'tablet' | 'desktop');

    function update() {
        if (window) {
            width.value = window.innerWidth;
            height.value = window.innerHeight;

            if (width.value < useBreakpoint.sm)
                return (layout.value = 'mobile');
            if (width.value < useBreakpoint.lg)
                return (layout.value = 'tablet');

            layout.value = 'desktop';
            useEventBus.emit('screen_resized');
        }
    }

    return {
        width,
        height,
        layout,

        update
    };
});
