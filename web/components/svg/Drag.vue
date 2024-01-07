<template>
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ rotate, loaded }"
    >
        <path
            d="M6 24H16H26"
            :stroke="color"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M6 16H16H26"
            :stroke="color"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M6 8H16H26"
            :stroke="color"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    color: { type: String, default: 'var(--accent)' },
    rotate: { type: Boolean, default: false }
});

const loaded = ref(false);

watch(
    () => props.rotate,
    () => {
        loaded.value = true;
    }
);
</script>

<style lang="scss" scoped>
svg {
    &.rotate {
        path:nth-child(1) {
            animation: first-bar-rotate 0.3s ease-in-out forwards;
        }
        path:nth-child(2) {
            animation: snd-bar-remove 0.3s ease-in-out forwards;
            animation-delay: 0.1s;
        }
        path:nth-child(3) {
            animation: third-bar-rotate 0.3s ease-in-out forwards;
            animation-delay: 0.2s;
        }
    }

    &:not(.rotate) {
        &.loaded {
            path:nth-child(1) {
                transform: rotate(45deg) translateY(-90%) translateX(12%)
                    scale(1.2, 1.2);
                animation: revert-first-bar-rotate 0.3s ease-in-out forwards;
                animation-delay: 0.1s;
            }
            path:nth-child(2) {
                opacity: 0;
                animation: revert-snd-bar-remove 0.3s ease-in-out forwards;
                animation-delay: 0.2s;
            }
            path:nth-child(3) {
                transform: rotate(-45deg) translateY(42%) translateX(-60%)
                    scale(1.2, 1.2);
                animation: revert-third-bar-rotate 0.2s ease-in-out forwards;
            }
        }
    }
}

@keyframes first-bar-rotate {
    0% {
        transform: rotate(0deg) translateY(0);
    }
    100% {
        transform: rotate(45deg) translateY(-90%) translateX(12%)
            scale(1.2, 1.2);
    }
}
@keyframes snd-bar-remove {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes third-bar-rotate {
    0% {
        transform: rotate(0deg) translateY(0);
    }
    100% {
        transform: rotate(-45deg) translateY(42%) translateX(-60%)
            scale(1.2, 1.2);
    }
}

@keyframes revert-first-bar-rotate {
    0% {
        transform: rotate(45deg) translateY(-90%) translateX(12%)
            scale(1.2, 1.2);
    }
    100% {
        transform: rotate(0deg) translateY(0);
    }
}
@keyframes revert-snd-bar-remove {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes revert-third-bar-rotate {
    0% {
        transform: rotate(-45deg) translateY(42%) translateX(-60%)
            scale(1.2, 1.2);
    }
    100% {
        transform: rotate(0deg) translateY(0);
    }
}
</style>