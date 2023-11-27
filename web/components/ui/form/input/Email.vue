<template>
    <input
        type="email"
        v-bind="{ ...$attrs, class: '', style: '' }"
        class="rounded-xl p-1.5 pl-2 font-h4"
        :style="{
            '--bg-color': bgColor,
            '--outline-color': outlineColor,
            '--focus': focusOutlineColor,
            '--font-color': fontColor
        }"
        :modelValue="modelValue"
            :autocomplete="autocomplete"
        @input="manageInput"
        @change="manageChange"
    />
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    autocomplete: {
        type: String as PropType<AutoComplete>,
        default: 'off'
    },

    bgColor: {
        type: String as PropType<CssColors>,
        default: 'white'
    },
    outlineColor: {
        type: String as PropType<CssColors>,
        default: 'var(--primary)'
    },
    focusOutlineColor: {
        type: String as PropType<CssColors>,
        default: 'var(--accent)'
    },
    fontColor: {
        type: String as PropType<CssColors>,
        default: 'var(--text)'
    }
});

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'change:modelValue', value: string): void;
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

    outline: 1.2px solid var(--outline-color);
    outline-offset: -1px;
    background: var(--bg-color, white);
    color: var(--font-color);

    &::placeholder {
        color: var(--outline-color);
    }

    &:disabled {
        background-color: var(--disabled-bg-color, var(--outline-color));
        outline-color: var(--disabled-outline-color, var(--outline-color));
        color: var(--disabled-font-color, white);
    }
}
</style>
