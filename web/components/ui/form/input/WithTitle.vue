<template>
    <legend :class="$attrs.class ?? '' + 'ml-1.5 mb-0.5'">Tets</legend>
    <UiFormInput
        v-bind="$attrs"
        :modelValue="modelValue"
        @update:modelValue="emits('update:modelValue', $event)"
        @change:modelValue="emits('change:modelValue', $event)"
    />
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String as PropType<String | Number>,
        required: true
    },
    type: {
        type: String as PropType<Inputs>,
        default: 'text'
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
    }
});

const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'change:modelValue', value: string | number): void;
}>();
</script>
