<template>
    <div class="grid grid-cols-4">
        <UiFormInput class="w-full" type="text" v-model="name" />
        <UiFormInput class="w-full" type="password" v-model="name" />
        <UiFormInput class="w-full" type="email" v-model="name" />
        <UiFormInput class="w-full" type="number" v-model="name" />
        <UiFormInput class="w-full" type="select" v-model="name" />
    </div>
</template>

<script lang="ts" setup>
const name = ref('');
</script>

<style lang="scss" scoped></style>
