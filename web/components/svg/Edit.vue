<template>
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.2429 19.6716V24.243C26.2429 24.8492 26.0021 25.4306 25.5735 25.8592C25.1448 26.2879 24.5634 26.5287 23.9572 26.5287H7.95722C7.35101 26.5287 6.76963 26.2879 6.34098 25.8592C5.91232 25.4306 5.67151 24.8492 5.67151 24.243V8.24299C5.67151 7.63678 5.91232 7.0554 6.34098 6.62675C6.76963 6.19809 7.35101 5.95728 7.95722 5.95728H12.5287"
            :stroke="color"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M17.6715 19.4429L28.5287 8.47151L23.7287 3.67151L12.8715 14.5287L12.5287 19.6715L17.6715 19.4429Z"
            :stroke="color"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
<script setup lang="ts">
const { color } = defineProps({
    color: { type: String, default: 'var(--accent)' }
});
</script>
