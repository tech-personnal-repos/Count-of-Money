<template>
    <button
        v-bind="{ ...$attrs, class: '', style: '' }"
        class="px-4 py-2 rounded-md font-h4"
        :disabled="disabled"
        :style="`--bg-color: ${bgColor}; --outline-color: ${outlineColor}; --font-color: ${fontColor};`"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup>
defineProps({
    bgColor: {
        type: String as PropType<CssColors>,
        default: 'var(--primary)'
    },
    outlineColor: {
        type: String as PropType<CssColors>,
        default: 'var(--primary)'
    },
    fontColor: {
        type: String as PropType<CssColors>,
        default: 'white'
    },

    disabled: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
button {
    outline: 1.2px solid var(--outline-color);
    outline-offset: -1px;
    background: var(--bg-color);
    color: var(--font-color);
    cursor: pointer;

    &:not(:disabled) {
        &:hover {
            transition: all 0.2s ease-in-out;
            scale: 1.05;
        }

        &:not(:hover) {
            transition: all 0.2s ease-in-out;
            scale: 1;
        }

        &:active {
            transition: all 0.2s ease-in-out;
            scale: 0.95;
        }
    }

    &:disabled {
        cursor: not-allowed;

        background-color: var(--disabled-bg-color, var(--outline-color));
        outline-color: var(--disabled-outline-color, var(--outline-color));
        color: var(--disabled-font-color, var(--font-color));
    }
}
</style>
