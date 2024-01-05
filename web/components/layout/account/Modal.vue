<template>
    <UiModal :isOpen="isOpen" @update:isOpen="emits('update:isOpen', $event)">
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
            <div class="flex justify-end">
                <UiFormButton type="submit" variant="primary" class="w-20">
                    Login
                </UiFormButton>
            </div>
        </form>
        <div class="w-full flex gap-2 mt-2">
            <NuxtLink
                :to="googleAuthUrl"
                class="w-1/2 flex-center h-10 border-primary border rounded-xl gap-1 p-2 cursor-pointer"
            >
                <img src="@/assets/icons/google.png" alt="google" class="h-6" />
                <p class="text-baseline">Google</p>
            </NuxtLink>
            <NuxtLink
                :to="githubAuthUrl"
                class="w-1/2 flex-center h-10 border-primary border rounded-xl gap-1 p-2 cursor-pointer"
            >
                <img src="@/assets/icons/github.png" alt="github" class="h-6" />
                <p class="text-baseline">Github</p>
            </NuxtLink>
        </div>
    </UiModal>
</template>

<script lang="ts" setup>
const username = ref('');
const password = ref('');

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const runtimeConfig = useRuntimeConfig();

const googleAuthUrl = computed(() => {
    const url = runtimeConfig.public.oauth.google.authUri;
    const state = getRandomOauthState();
    localStorage.setItem('googleState', state);

    const params = {
        client_id: runtimeConfig.public.oauth.google.clientId,
        redirect_uri: `${runtimeConfig.public.oauth.redirectUri}/oauth/google`,
        response_type: 'code',
        scope: 'openid profile email',
        state
    };
    return `${url}?${new URLSearchParams(params)}`;
});

const githubAuthUrl = computed(() => {
    const url = runtimeConfig.public.oauth.github.authUri;
    const state = getRandomOauthState();
    localStorage.setItem('githubState', state);

    const params = {
        client_id: runtimeConfig.public.oauth.github.clientId,
        redirect_uri: `${runtimeConfig.public.oauth.redirectUri}/oauth/github`,
        response_type: 'code',
        scope: 'read:user',
        state
    };
    return `${url}?${new URLSearchParams(params)}`;
});

const emits = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

function submit() {
    console.log('submitted');
}
</script>

<style lang="scss" scoped></style>
