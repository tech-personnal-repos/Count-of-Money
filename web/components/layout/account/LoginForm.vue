<template>
    <form @submit.prevent="submit" class="flex flex-col gap-2 items-center">
        <UiFormInputWithTitle
            v-model="username"
            type="text"
            label="Username"
            title="Username"
            autocomplete="username"
            required
        />
        <UiFormInputWithTitle
            v-model="password"
            type="password"
            label="Password"
            title="Password"
            autocomplete="current-password"
            required
        />
        <div class="flex justify-end mt-2">
            <UiFormButton type="submit" variant="primary" class="w-20">
                Login
            </UiFormButton>
        </div>
    </form>
    <p class="flex flex-1 w-full justify-center gap-2 mt-2">
        No account ?
        <p class="underline text-primary cursor-pointer hover:scale-105 transition-transform"
        @click="emits('change:form', 'signup')">
            Sign up here
        </p>
    </p>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
    (e: 'change:form', value: 'login' | 'signup'): void;
    (e: 'connected'): void;
}>();

const username = ref('');
const password = ref('');

function submit() {
    console.log('submitted');
    emits('connected');
}
</script>

<style lang="scss" scoped></style>
