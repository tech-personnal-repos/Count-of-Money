<template>
    <VDropdown
        :shown="isOpen"
        ref="select"
        :autoHide="false"
        :triggers="[]"
        @click="isOpen = !isOpen"
    >
        <UiFormButton class="test">test</UiFormButton>

        <template #popper>
            <UiFormInputSelectDropdown
                :modelValue="modelValue"
                style="{ width: width + 'px'; height: '10rem'; }"
                :autocomplete="autocomplete"
                :bgColor="bgColor"
                :outlineColor="outlineColor"
                :focusOutlineColor="focusOutlineColor"
                :fontColor="fontColor"
            />
        </template>
    </VDropdown>
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

const isOpen = ref(false);
const select = ref();
const test = ref();

const width = ref(0);

watch(
    () => select.value,
    () => {
        if (!select.value) return;
        width.value = select.value.$el.getBoundingClientRect().width;
    },
    { deep: true, immediate: true }
);

useClickOutside(select, () => {
    isOpen.value = false;
});
</script>

<style lang="scss" scoped></style>
