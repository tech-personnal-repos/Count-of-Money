<template>
    <svg
        v-if="hasUnreadNotification"
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M43.6667 56.6467H55.5219C58.6626 56.5214 61.1111 53.829 60.9961 50.6273C60.9961 50.5565 60.9961 50.4861 60.9961 50.4153C60.8403 45.418 55.5257 40.5608 55.5257 35.5749C55.9565 23.5705 46.7774 13.474 35.0019 13C23.2266 13.474 14.0475 23.5705 14.4783 35.5749C14.4783 40.5646 9.16361 45.4331 9.00389 50.4153C9.00389 50.4861 9.00389 50.5565 9.00389 50.6273C8.88889 53.829 11.3377 56.5214 14.4783 56.6467H26.3372M43.6667 56.6467C43.6778 59.1 42.7704 61.4653 41.1302 63.2606C39.5528 65.0066 37.3305 66 35.0019 66C32.6733 66 30.4514 65.0066 28.8739 63.2606C27.2333 61.4653 26.3262 59.1 26.3372 56.6467M43.6667 56.6467H26.3372"
            :stroke="color"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M30 4H40"
            :stroke="color"
            stroke-width="5"
            stroke-linecap="round"
        />
        <circle cx="49" cy="21" r="10" :fill="unreadColor" />
    </svg>

    <svg
        v-else
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M43.6667 56.6467H55.5219C58.6626 56.5214 61.1111 53.829 60.9961 50.6273C60.9961 50.5565 60.9961 50.4861 60.9961 50.4153C60.8403 45.418 55.5257 40.5608 55.5257 35.5749C55.9565 23.5705 46.7774 13.474 35.0019 13C23.2266 13.474 14.0475 23.5705 14.4783 35.5749C14.4783 40.5646 9.16361 45.4331 9.00389 50.4153C9.00389 50.4861 9.00389 50.5565 9.00389 50.6273C8.88889 53.829 11.3377 56.5214 14.4783 56.6467H26.3372M43.6667 56.6467C43.6778 59.1 42.7704 61.4653 41.1302 63.2606C39.5528 65.0066 37.3305 66 35.0019 66C32.6733 66 30.4514 65.0066 28.8739 63.2606C27.2333 61.4653 26.3262 59.1 26.3372 56.6467M43.6667 56.6467H26.3372"
            :stroke="color"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M30 4H40"
            :stroke="color"
            stroke-width="5"
            stroke-linecap="round"
        />
    </svg>
</template>

<script lang="ts" setup>
defineProps({
    color: {
        type: String as PropType<CssColors>,
        default: 'var(--primary)'
    },
    hasUnreadNotification: {
        type: Boolean,
        default: false
    },
    unreadColor: {
        type: String as PropType<CssColors>,
        default: 'var(--secondary)'
    }
});
</script>

<style lang="scss" scoped></style>
