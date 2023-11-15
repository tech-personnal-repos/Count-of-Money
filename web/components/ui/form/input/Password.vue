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
        class="rounded-xl text-xl flex"
    >
        <input
            :type="isHide ? 'password' : 'text'"
            v-bind="{
                ...$attrs,
                class: 'rounded-xl p-0.5 pl-2 flex-1 ' + ($attrs.class ?? ''),
                style: ''
            }"
            :class="{ 'is-hide': isHide && modelValue.length }"
            :id="id"
            @input="manageInput"
            @change="manageChange"
            @focus="isFocus = true"
            @blur="isFocus = false"
        />
        <div @click="isHide = !isHide" class="p-1.5 h-8">
            <SvgEye v-if="!isHide" class="h-full w-full" />
            <SvgEyeSlash v-else class="h-full w-full" />
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
label {
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        input {
            outline: none;
            &.is-hide {
                -webkit-text-stroke-width: 0.15em;
                letter-spacing: 0.15em;
            }
        }
    }

    input {
        &::placeholder {
            color: var(--primary);
        }
    }

    &.focus {
        outline: 1.2px solid var(--focus);
    }

    outline: 1.2px solid var(--outline-color);
    outline-offset: -1px;
    background: var(--bg-color, white);

    &:disabled {
        background-color: var(--disabled-bg-color, var(--outline-color));
        outline-color: var(--disabled-outline-color, var(--outline-color));
        color: var(--disabled-font-color, white);
    }
}
</style>
