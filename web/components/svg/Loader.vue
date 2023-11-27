<template>
    <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM15 27C21.6274 27 27 21.6274 27 15C27 8.37258 21.6274 3 15 3C8.37258 3 3 8.37258 3 15C3 21.6274 8.37258 27 15 27Z"
            :fill="color"
            fill-opacity="0.3"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.3638 8.18765C29.4393 10.2974 30 12.6319 30 15H27C27 8.37259 21.6274 3 15 3C13.7023 3 12.4528 3.20598 11.2823 3.58701L10.3541 0.737617C12.6057 0.00415272 14.9991 -0.185778 17.3382 0.183366C19.6774 0.55251 21.8959 1.47024 23.8122 2.86146C25.7286 4.25268 27.2883 6.07786 28.3638 8.18765Z"
            :fill="color"
        />

        <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="1s"
            repeatCount="indefinite"
        />
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
