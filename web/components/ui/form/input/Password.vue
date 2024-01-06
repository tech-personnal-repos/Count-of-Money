<template>
    <label
        :for="id"
        :style="{
            '--bg-color': bgColor,
            '--outline-color': outlineColor,
            '--focus': focusOutlineColor,
            '--font-color': fontColor
        }"
        :class="{ focus: isFocus }"
        ref="label"
        class="rounded-xl flex h-min"
    >
        <input
            ref="input"
            :type="isHide ? 'password' : 'text'"
            v-bind="{
                ...$attrs,
                class: 'rounded-xl p-0.5 pl-2 font-mb1 flex-1',
                style: ''
            }"
            :id="id"
            :autocomplete="autocomplete"
            :size="size - 4"
            @input="manageInput"
            @change="manageChange"
            @focus="isFocus = true"
        />
        <div
            @click.stop="toggleHideShow"
            class="p-1 mr-0.5 ml-auto"
            :style="{ height: svgHeight + 'px', width: svgHeight + 'px' }"
            ref="svg"
        >
            <SvgEye v-if="!isHide" class="h-full w-full" :color="svgColor" />
            <SvgEyeSlash v-else class="h-full w-full" :color="svgColor" />
        </div>
    </label>
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: Math.random().toString(36).substring(2, 12)
    },

    autocomplete: {
        type: String as PropType<AutoComplete>,
        default: 'off'
    },
    size: {
        type: Number,
        default: 20
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

const isHide = ref(true);
const isFocus = ref(false);
const input = ref();
const label = ref();
const svg = ref();
const svgHeight = ref(0);

watch(
    () => input.value,
    () => {
        if (!input.value) return;
        svgHeight.value = input.value.getBoundingClientRect().height;
    },
    { deep: true, immediate: true }
);

const svgColor = computed(() => {
    if (isFocus.value) return 'var(--focus)';
    return 'var(--outline-color)';
});

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'change:modelValue', value: string): void;
}>();

function toggleHideShow() {
    if (input.value) {
        input.value.focus();
    }
    isHide.value = !isHide.value;
}

function manageInput(event: Event) {
    const target = event?.target as HTMLInputElement;
    emits('update:modelValue', target?.value);
}

function manageChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    emits('change:modelValue', target?.value);
}

useClickOutside(label, () => {
    isFocus.value = false;
});
</script>

<style lang="scss" scoped>
label {
    input {
        &::placeholder {
            color: var(--outline-color);
        }
        outline: none;
    }

    &.focus {
        outline: 1.2px solid var(--focus);
    }

    outline: 1.2px solid var(--outline-color);
    outline-offset: -1px;
    background: var(--bg-color, white);
    color: var(--font-color);

    &:disabled {
        background-color: var(--disabled-bg-color, var(--outline-color));
        outline-color: var(--disabled-outline-color, var(--outline-color));
        color: var(--disabled-font-color, white);
    }
}
</style>
