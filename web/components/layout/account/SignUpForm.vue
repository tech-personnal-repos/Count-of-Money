<template>
    <form @submit.prevent="submit" class="flex flex-col gap-1 items-center">
        <UiFormInputWithTitle
            v-model="username"
            type="text"
            label="Username"
            title="Username*"
            autocomplete="username"
            required
        />
        <UiFormInputWithTitle
            v-model="email"
            type="email"
            label="Email"
            title="Email*"
            autocomplete="email"
            required
        />
        <UiFormInputWithTitle
            v-model="displayName"
            type="text"
            label="Display Name"
            title="Display Name*"
            autocomplete="name"
            required
        />
        <UiFormInputWithTitle
            v-model="password"
            type="password"
            label="Password"
            title="Password*"
            autocomplete="current-password"
            required
        />
        <UiFormInputWithTitle
            v-model="avatarUrl"
            type="text"
            label="Avatar URL"
            title="Avatar URL"
            autocomplete="url"
        />
        <div class="flex justify-end mt-2">
            <UiFormButton type="submit" variant="primary" class="w-20">
                Sign up
            </UiFormButton>
        </div>
    </form>
        <p class="flex flex-1 w-full justify-center gap-2 mt-2">
        Already an account ?
        <p class="underline text-primary cursor-pointer hover:scale-105 transition-transform"
        @click="emits('change:form', 'login')">
            Log in here
        </p>
    </p>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
    (e: 'change:form', value: 'login' | 'signup'): void;
}>();

const username = ref('');
const displayName = ref('');
const password = ref('');
const email = ref('');
const avatarUrl = ref('');

function submit() {
    console.log('submitted');
}
</script>

<style lang="scss" scoped></style>
