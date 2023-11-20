<template>
    <button
        v-bind="{ ...$attrs, class: '', style: '' }"
        class="p-1.5 rounded-xl font-h4"
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
    @apply relative h-min;
	@apply shadow-sm;
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

		&::after {
			@apply absolute inset-0 h-full w-full rounded-full;
			content: '';

			background: rgba(0 0 0 / 0.2);
		}
    }
}
</style>
