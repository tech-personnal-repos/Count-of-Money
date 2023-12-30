<template>
    <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Explore">
            <path
                id="Vector"
                d="M28.8128 28.8128L45.3119 24.688L41.1871 41.1871L24.688 45.3119L28.8128 28.8128Z"
                :stroke="color"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                id="Vector_2"
                d="M35 61.25C49.4976 61.25 61.25 49.4976 61.25 35C61.25 20.5025 49.4976 8.75 35 8.75C20.5025 8.75 8.75 20.5025 8.75 35C8.75 49.4976 20.5025 61.25 35 61.25Z"
                :stroke="color"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
    </svg>
</template>

<script lang="ts" setup>
defineProps({
    color: {
        type: String as PropType<CssColors>,
        default: 'var(--accent)'
    }
});
</script>

<style lang="scss" scoped></style>
