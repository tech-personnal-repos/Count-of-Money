<template>
    <div class="flex flex-col">
        <legend :class="'ml-1.5 -mb-0.5 w-full'">{{ title }}</legend>
        <UiFormInput
            v-bind="{ ...$attrs, class: 'w-full h-full', style: '', ...$props }"
            @update:modelValue="emits('update:modelValue', $event)"
            @change:modelValue="emits('change:modelValue', $event)"
        />
    </div>
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String as PropType<String | Number>,
        required: true
    },
    title: {
        type: String,
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
    },
    fontColor: {
        type: String as PropType<CssColors>,
        default: 'var(--text)'
    }
});

const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'change:modelValue', value: string | number): void;
}>();
</script>
