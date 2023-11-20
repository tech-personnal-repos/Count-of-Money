<template>
    <div class="h-full w-full flex-center">
        <form @submit.prevent="login" class="flex-col justify-center items-center gap-2">
            <UiFormInputWithTitle
                v-model="username"
                class="w-[15rem]"
                title="Username or Email"
                type="text"
                autocomplete="username"
                required
            />
            <UiFormInputWithTitle
                v-model="password"
                class="w-[15rem]"
                title="Password"
                type="password"
                autocomplete="current-password"
                required
            />
            <div class="flex justify-center">
                <UiFormButton type="submit" class="w-40"> Sign in </UiFormButton>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
const username = ref('');
const password = ref('');

async function login() {
    if (!await connect(username.value, password.value))
        return useToast.error('Invalid username or password');
}
</script>

<style lang="scss" scoped></style>
