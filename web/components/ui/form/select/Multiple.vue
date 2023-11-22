<template>
    <VDropdown
        ref="select"
        class="search-select text-primary font-mb1"
        :disabled="disabled"
        @click="isOpen = !isOpen && !disabled"
        :triggers="[]"
        :shown="!absolute && isOpen"
        :autoHide="false"
        :distance="distance"
        :style="{
            style,
            '--bg-color': bgColor,
            '--outline-color': outlineColor,
            '--focus': focusOutlineColor,
            '--font-color': fontColor
        }"
    >
        <div
            class="select w-full overflow-y-auto relative p-[3.5px] !pl-2 min-h-[27px] font-h4"
            :class="{ disabled, focus: isOpen }"
            :style="{
                maxHeight
            }"
            ref="input"
        >
            <!-- <div class="absolute p-1 bg-white bg-opacity-80">
            <template v-if="search">
                {{ search }}
            </template>
        </div> -->
            <div class="w-[calc(100%-0.75rem)] h-full flex flex-wrap gap-2">
                <template v-for="(option, index) in selectedOption">
                    <div class="selected-element max-w-[calc(100%-0.5rem)]">
                        <div
                            class="max-w-[calc(100%-1.5rem)] text-ellipsis"
                        >
                            <slot
                                :name="`option-${index}`"
                                :option="selectedOption"
                            >
                                {{ option.label || '' }}
                            </slot>
                        </div>
                        <SvgClose
                            class="h-4 w-4 ml-2"
                            color="white"
                            @click.stop="removeOption(option)"
                        />
                    </div>
                </template>
            </div>
        </div>
        <SvgArrowBottom
            v-if="!disabled"
            class="arrow absolute right-1.5 top-1/2 -translate-y-1/4"
            :color="outlineColor"
        />

        <template #popper>
            <UiFormSelectDropdown
                v-if="isOpen && selectSize"
                :style="`width: ${selectSize}`"
                v-model:search="search"
                v-close-popper
                @update:selectedOptions="selectOption"
                :selectedOptions="selectedOption"
                :hasPlaceholder="Boolean(placeholder)"
                :align="align"
                :options="filteredOptions"
                :is-multiple="true"
            >
                <template #option="{ option }">
                    <slot name="option" :option="option" />
                </template>
            </UiFormSelectDropdown>
        </template>

        <div
            v-if="absolute && isOpen && selectSize"
            class="absolute-select__inner"
        >
            <UiFormSelectDropdown
                :style="`width: ${selectSize}`"
                v-model:search="search"
                @update:selectedOptions="selectOption"
                :selectedOptions="selectedOption"
                :hasPlaceholder="Boolean(placeholder)"
                :align="align"
                :options="filteredOptions"
                :is-multiple="true"
            >
                <template #option="{ option }">
                    <slot name="option" :option="option" />
                </template>
            </UiFormSelectDropdown>
        </div>
    </VDropdown>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: Object as PropType<String[]>, required: true },
    options: { type: Object as PropType<SelectOption[]>, default: [] },
    placeholder: { type: String, default: null },

    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    absolute: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    maxRows: { type: Number, default: 1 },

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
    (e: 'update:modelValue', value: string[]): void;
}>();

const select = ref();
const input = ref();

const selectSize = computed(() => {
    const size = select.value?.$el?.getBoundingClientRect()?.width;
    return size ? `${size - 5}px` : null;
});

const search = ref('');
const isOpen = ref(false);
const options = ref(
    props.placeholder
        ? [{ value: '', label: props.placeholder }, ...props.options]
        : props.options
);
const selectedOption = ref(
    options.value.filter(o => props.modelValue.includes(o.value)) || []
);

const distance = ref(3);

watch(
    () => selectedOption.value,
    () => {
        if (!input.value) return;
        distance.value = 4;
        nextTick(() => {
            distance.value = 3;
        });
    },
    { immediate: true, deep: true }
);

watch(
    () => props.modelValue,
    nValue => {
        selectedOption.value =
            options.value.filter(o => nValue.includes(o.value)) || [];
    },
    { deep: true }
);

const filteredOptions = computed(() => {
    if (!search.value || !options.value) return options.value;
    return options.value;
    const filtered = options.value.filter(
        o =>
            o.label.toLowerCase().includes(search.value.toLowerCase()) ||
            !o.value?.length
    );
    return filtered;
});

const maxHeight = computed(() => {
    const rowHeight = 20;
    // select padding: 4px
    // gap: 8px

    // maxRows === 1: 1 * 15 + 12 + 0 * 8
    // maxRows === 2: 1 * 15 + 12 + 1 * 8
    // maxRows === 2: 1 * 15 + 12 + 1 * 8
    return `${props.maxRows * rowHeight + (props.maxRows - 1) * 8 + 7}px`;
});

const style = computed(() => {
    const maxWidth = Math.max(...options.value.map(o => o.label?.length || 0));
    return `width: ${maxWidth + 3}ch`;
});

defineExpose({
    reset: () => {
        search.value = '';
        isOpen.value = false;

        if (props.placeholder)
            selectedOption.value = [
                options.value.find(o => o.value === '')
            ] as SelectOption[];
        else selectedOption.value = [];
    }
});

watch(
    () => props.options,
    () => {
        options.value = props.options.map(o => ({
            ...o,
            disabled: o.disabled || false
        }));
        if (props.placeholder)
            options.value.unshift({ value: '', label: props.placeholder });
        selectedOption.value =
            options.value.filter(o => props.modelValue.includes(o.value)) || [];
    }
);

function removeOption(option: SelectOption) {
    selectedOption.value = selectedOption.value.filter(
        o => o.value !== option.value
    );
    emits(
        'update:modelValue',
        selectedOption.value.map(o => o.value)
    );
}

function selectOption(options: SelectOption[]) {
    console.log(options);
    if (!options) return;
    selectedOption.value = options;

    emits(
        'update:modelValue',
        selectedOption.value.map(o => o.value)
    );
}

useClickOutside([select], () => {
    isOpen.value = false;
    search.value = '';
});
</script>

<style scoped lang="scss">
.search-select {
    position: relative;

    .select {
        outline: 1.2px solid var(--gold-light-2);
        padding-inline: 0.25rem;
        border-radius: 1.5rem;
        margin-right: 1rem;

        transition: outline 100ms ease-in-out;

        cursor: pointer;

        color: var(--font-color);
        background-color: var(--bg-color) !important;
        outline: 1.2px solid var(--outline-color);

        &.focus {
            outline: 1.2px solid var(--focus);
            .arrow {
                transform: rotate(180deg) translateY(50%);
            }
        }

        background: var(--bg);
        color: var(--text);

        .selected-element {
            @apply rounded-full;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            width: fit-content;
            background-color: var(--accent);
            color: white;
            padding: 2px;

            @apply px-1.5;

            white-space: nowrap;
            overflow: hidden;

            &.left {
                justify-content: flex-start;
            }

            &.center {
                justify-content: center;
            }

            &.right {
                justify-content: flex-end;
            }
        }

        &.isDisabled {
            cursor: default;

            .selected-element {
                width: 100%;
            }
        }
    }
}

.absolute-select__inner {
    z-index: 20;

    position: absolute;
    top: calc(100% + 0.25rem);

    background-color: var(--secondary);
}
</style>
