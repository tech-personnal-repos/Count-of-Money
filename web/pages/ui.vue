<template>
    <div class="grid grid-cols-4">
        <UiFormInput class="w-full" type="text" v-model="name" />
        <UiFormInput class="w-full" type="password" v-model="name" />
        <UiFormInput class="w-full" type="email" v-model="name" />
        <UiFormInput class="w-full" type="number" v-model="name" />
        <UiFormSelectMultiple
            class="w-full"
            v-model="test"
            :options="options"
                 :max-rows="3"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const name = ref('');
const test = ref([]);

const options = Array.from({ length: 20 }, (_, index) => ({
    label: `Optiaaaaaaa`,
    value: `option_${index + 1}`
}));
</script>

<style lang="scss" scoped></style>
