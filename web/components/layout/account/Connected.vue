<template>
    <div class="flex-center flex-col p-2">
        <h5>You are connected !</h5>
        <UiFormButton @click="handleClick" class="px-2"> Logout </UiFormButton>
    </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
    (e: 'disconnect'): void;
}>();

function handleClick() {
    disconnect();
    emits('disconnect');
}
</script>

<style lang="scss" scoped></style>
