<template>
    <svg
        width="15"
        height="6"
        viewBox="0 0 15 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            id="Polygon 3"
            d="M7.5 0L14.4282 5.25H0.571797L7.5 0Z"
            :fill="color"
        />
    </svg>
</template>

<script lang="ts" setup>
defineProps({
    color: {
        type: String,
        default: 'var(--accent)'
    }
});
</script>

<style lang="scss" scoped></style>
