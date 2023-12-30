<template>
    <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Article">
            <path
                id="Vector"
                d="M43.75 23.3334H49.5833M43.75 35H49.5833M49.5833 46.6667H20.4167M20.4167 23.3334V35H32.0833V23.3334H20.4167ZM14.5833 58.3334H55.4167C56.9638 58.3334 58.4475 57.7188 59.5415 56.6248C60.6354 55.5308 61.25 54.0471 61.25 52.5V17.5C61.25 15.9529 60.6354 14.4692 59.5415 13.3752C58.4475 12.2813 56.9638 11.6667 55.4167 11.6667H14.5833C13.0362 11.6667 11.5525 12.2813 10.4585 13.3752C9.36458 14.4692 8.75 15.9529 8.75 17.5V52.5C8.75 54.0471 9.36458 55.5308 10.4585 56.6248C11.5525 57.7188 13.0362 58.3334 14.5833 58.3334Z"
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
