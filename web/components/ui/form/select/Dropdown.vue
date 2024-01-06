<template>
    <TransitionGroup
        name="list"
        tag="ul"
        class="options select-none v-popper__select-search-options  overflow-auto h-[11rem]"
        :class="{ placeholder: hasPlaceholder, [variant]: Boolean(variant) }"
        :style="{
            '--bg-color': bgColor,
            '--outline-color': outlineColor,
            '--focus': focusOutlineColor,
            '--font-color': fontColor,
            outline: `solid 1px ${outlineColor} !important`,
			background: `${bgColor} !important`,
            color: fontColor
        }"
    >
        <li
            v-for="(option, index) in options"
            :key="index"
            :id="`option-${index}`"
            @click.stop="handleOptionClick($event, option)"
            @mouseenter="tmpSelectedOption = option"
            @mouseleave="tmpSelectedOption = null"
            class="option font-mb1"
            :class="{
                [align]: true,
                selected: selectedOptions.length && selectedOptions?.find(o => o.value === option.value),
                hover: tmpSelectedOption?.value === option.value,
                disabled: option.disabled
            }"
        >
            <div>
                <slot name="option" :option="option">
                    {{ option.label }}
                </slot>
            </div>
        </li>
    </TransitionGroup>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
    (e: 'update:selectedOptions', value: SelectOption[]): void;
    (e: 'update:search', value: string): void;
    (e: 'esc'): void;
}>();

const props = defineProps({
    search: { type: String , default: '' },
	isMultiple: { type: Boolean, default: false },

    selectedOptions: {
        type: Object as PropType<SelectOption[]>,
        required: true,
    },
    options: { type: Array as PropType<SelectOption[]>, default: [] },

    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    variant: { type: String as PropType<Variants>, default: null },

    hasPlaceholder: { type: Boolean, default: false },

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

let isControlPressed = false;
const tmpSelectedOption = ref(null as SelectOption | null);

function handleOptionClick(event: Event, option: SelectOption) {
    if (option?.disabled) return;
	if (props.selectedOptions?.find(o => o.value === option.value)) {
		if (props.isMultiple)
		return emits('update:selectedOptions', props.selectedOptions.filter(o => o.value !== option.value));
		else return emits('update:selectedOptions', []);
	}

	if (!props.isMultiple) return emits('update:selectedOptions', [option]);
    emits('update:selectedOptions', [...props.selectedOptions, option]);
}

function handleArrowKeys(key: 'ArrowUp' | 'ArrowDown') {
	if (props.options.length === 0) return;

	if (!tmpSelectedOption.value || !props.options.find(o => tmpSelectedOption.value?.value === o.value)) {
		if (props.selectedOptions?.length) {
			tmpSelectedOption.value = null;
			for (const t of props.selectedOptions) {
				const index = props.options.findIndex(o => o.value === t.value);
				if (index !== -1) (tmpSelectedOption.value = props.options[index]);
			}
			if (!tmpSelectedOption.value) (tmpSelectedOption.value = props.options[0]);
		} else return (tmpSelectedOption.value = props.options[0]);
	}

	const index = props.options.findIndex(o => o.value === tmpSelectedOption.value?.value);
	if (index === -1) return;

	let optionIndex: number;

	if (index === 0 && key === 'ArrowUp') optionIndex = props.options.length - 1;
	else if (index === props.options.length - 1 && key === 'ArrowDown') optionIndex = 0;
	else optionIndex = index + (key === 'ArrowUp' ? -1 : 1);

	tmpSelectedOption.value = props.options.at(optionIndex) || null;

	const element = document.getElementById(`option-${optionIndex}`);
	element?.scrollIntoView({
		block: 'nearest',
		inline: 'nearest',
		behavior: 'instant'
	});
}

function handleKeyDownEvent(event: KeyboardEvent) {
	event.preventDefault();

	switch (event.key) {
		case 'Enter':
			if (props.options.length === 0) return;
			return handleOptionClick(event as Event, tmpSelectedOption.value!);

		case 'Escape':
			tmpSelectedOption.value = null;
			return emits('update:selectedOptions', props.selectedOptions);

		case 'Backspace':
			if ((event.ctrlKey && !navigator.userAgent.includes('Mac OS X')) || event.metaKey) {
				event.preventDefault();
				return emits('update:search', '');
			}

			return emits('update:search', props.search.slice(0, -1));

		case 'ArrowUp':
		case 'ArrowDown':
			return handleArrowKeys(event.key);
	}

	if (event.key.length !== 1) return;

	emits('update:search', `${props.search}${event.key}`);
}

function handleScrollEvent(e: Event) {
	if ((e.target as Element).closest('.v-popper__inner') || (e.target as Element).closest('.absolute-select__inner')) {
		return;
	}

	emits('update:selectedOptions', props.selectedOptions);
}

onMounted(() => {
	window.addEventListener('scroll', handleScrollEvent, true);

	window.addEventListener('keydown', handleKeyDownEvent);

	setTimeout(() => {
		if (!props.selectedOptions?.length) return;

		const index = props.options.findIndex(o => o.value === props.selectedOptions[0]!.value);
		if (index === -1) return;

		const element = document.getElementById(`option-${index}`);
		element?.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
			behavior: 'smooth'
		});
	}, 50);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScrollEvent);
    window.removeEventListener('keydown', handleKeyDownEvent);
});
</script>

<style lang="scss" scoped>
.placeholder {
    li:first-child {
        border-bottom: 1px solid var(--focus);
    }
}

.options {
    .option {
        @apply cursor-pointer px-1 py-0.5;

        &.left {
            text-align: left;
        }

        &.center {
            text-align: center;
        }

        &.right {
            text-align: right;
        }

        &.hover {
            background-color: rgba($color: #000, $alpha: 0.2);
        }

        &.selected {
            background-color: rgba($color: #000, $alpha: 0.1);
        }

        &.disabled {
            display: none;
        }
    }
}
</style>

<style lang="scss">
.v-popper__inner:has(.v-popper__select-search-options),
.absolute-select__inner:has(.v-popper__select-search-options) {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    max-height: 12rem !important;
	border: 1px solid var(--accent) !important;

    border-bottom-right-radius: 0.75rem !important;
    border-bottom-left-radius: 0.75rem !important;

    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
}
</style>
