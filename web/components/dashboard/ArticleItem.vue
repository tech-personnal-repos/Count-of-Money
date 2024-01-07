<template>
    <div class=" py-5 px-4 h-[6.25rem] w-full"></div>
</template>

<script lang="ts" setup>
defineProps({
    crypto: {
        type: Object as PropType<Coin>,
        required: true
    }
});
</script>

<style lang="scss" scoped></style>
