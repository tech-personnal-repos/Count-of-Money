<template>
    <VDropdown
        ref="select"
        class="search-select text-primary font-mb1"
        :disabled="disabled"
        @click="isOpen = !isOpen && !disabled"
        :triggers="[]"
        :shown="!absolute && isOpen"
        :autoHide="false"
		:distance="3"
        :style="{
            style,
            '--bg-color': bgColor,
            '--outline-color': outlineColor,
            '--focus': focusOutlineColor,
            '--font-color': fontColor
        }"
    >
        <div
            class="select w-full"
            :class="{ disabled, focus: isOpen }"
        >
            <div class="selected-element" :class="align">
                <template v-if="search">
                    {{ search }}
                </template>

                <slot
                    name="option"
                    v-else-if="selectedOption"
                    :option="selectedOption"
                >
                    {{ selectedOption?.label || '' }}
                </slot>
            </div>

            <SvgArrowBottom
                v-if="!disabled"
                class="arrow absolute right-1.5 top-1/2 -translate-y-1/4"
                :color="outlineColor"
            />
        </div>

        <template #popper>
            <UiFormSelectDropdown
                v-if="isOpen && selectSize"
                :style="`width: ${selectSize}`"
                v-model:search="search"
                v-close-popper
                @update:selectedOptions="selectOption"
                :selectedOptions="selectedOption ? [selectedOption]: []"
                :hasPlaceholder="Boolean(placeholder)"
                :align="align"
                :options="filteredOptions"
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
                :selectedOptions="selectedOption ? [selectedOption]: []"
                :hasPlaceholder="Boolean(placeholder)"
                :align="align"
                :options="filteredOptions"
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
    modelValue: { type: String as PropType<String>, required: true },
    options: { type: Object as PropType<SelectOption[]>, default: [] },
    placeholder: { type: String, default: null },

    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    absolute: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

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
    (e: 'update:modelValue', value: string | null): void;
}>();

const select = ref();
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
    options.value.find(o => o.value === props.modelValue)
);

watch(
    () => props.modelValue,
    nValue => {
        selectedOption.value =
            options.value.find(o => o.value === nValue);
    }
);

const filteredOptions = computed(() => {
    if (!search.value || !options.value) return options.value;
    const filtered = options.value.filter(
        o =>
            o.label.toLowerCase().includes(search.value.toLowerCase()) ||
            !o.value?.length
    );
    return filtered;
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
            selectedOption.value =
                options.value.find(o => o.value === '');
        else selectedOption.value = undefined;
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
            options.value.find(o => o.value === props.modelValue);
    }
);

function selectOption(options: SelectOption[]) {
    if (!options) return;

	console.log(options);
    search.value = '';
    isOpen.value = false;
    selectedOption.value = options.at(0);

    emits('update:modelValue', selectedOption.value?.value || null);
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
        height: var(--height, 1.5625rem);
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
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            width: calc(100% - 0.75rem);

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
