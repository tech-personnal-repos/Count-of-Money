<template>
    <input
        type="number"
        v-bind="{ ...$attrs, class: '', style: '' }"
        class="rounded-xl p-0.5 pl-2 text-xl"
        :style="`--color: ${color}; --focus: ${focusColor};`"
        @input="manageInput"
        @change="manageChange"
    />
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Number,
        required: true
    },

    textAlign: {
        type: String as PropType<'left' | ' center' | 'right'>,
        default: 'left'
    },

    color: {
        type: String,
        default: 'var(--primary)'
    },
    focusColor: {
        type: String,
        default: 'var(--accent)'
    },

    autocomplete: {
        type: String as PropType<AutoComplete>,
        default: 'off'
    },
});

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'change:modelValue', value: string): void;
}>();

function manageInput(event: Event) {
    const target = event?.target as HTMLInputElement;
    emits('update:modelValue', target?.value);
}

function manageChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    emits('change:modelValue', target?.value);
}
</script>

<style lang="scss" scoped>
input {
    &:focus {
        outline: 1.2px solid var(--focus);
    }

    outline: 1.2px solid var(--color);
    outline-offset: -1px;
    background: var(--input-background, white);

    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &.isDisabled {
        background-color: var(--disabled-bg-color, var(--color));
        outline-color: var(--disabled-outline-color, var(--color));
        color: var(--disabled-font-color, white);
    }
}
</style>
