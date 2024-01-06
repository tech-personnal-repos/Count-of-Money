<template>
    <UiModal :isOpen="isOpen" @update:isOpen="emits('update:isOpen', $event)">
        <LayoutAccountLoginForm
            v-if="form === 'login'"
            @change:form="form = 'signup'"
        />
        <LayoutAccountSignUpForm
            v-else-if="form === 'signup'"
            @change:form="form = 'login'"
        />

        <div class="w-full flex gap-2 mt-2">
            <NuxtLink :to="googleAuthUrl" class="oauth">
                <img src="@/assets/icons/google.png" alt="google" class="h-6" />
                <p class="text-baseline">Google</p>
            </NuxtLink>
            <NuxtLink :to="githubAuthUrl" class="oauth">
                <img src="@/assets/icons/github.png" alt="github" class="h-6" />
                <p class="text-baseline">Github</p>
            </NuxtLink>
        </div>
    </UiModal>
</template>

<script lang="ts" setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const form = ref('login' as 'login' | 'signup');

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
</script>

<style lang="scss" scoped>
.oauth {
    @apply w-1/2 h-10 rounded-2xl p-2 cursor-pointer transition-transform;
    @apply flex-center gap-1;

    border: solid 1px var(--primary);

    &:hover {
        @apply scale-105;
    }
}
</style>
