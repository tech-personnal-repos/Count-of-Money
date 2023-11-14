<template>
    <form @submit.prevent>
        <UiFormInput
            type="email"
            label="Name"
            placeholder="Enter your name"
            name="name"
            id="name"
            v-model="name"
            :required="true"
        />
    </form>
</template>

<script lang="ts" setup>
const name = ref('');
</script>

<style lang="scss" scoped></style>
