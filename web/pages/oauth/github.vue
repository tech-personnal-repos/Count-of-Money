<template>
    <UiLoaderAbsolute />
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'empty' });

const route = useRoute();

const state = route.query.state as string;
const code = route.query.code as string;

useMountedFetch(async () => {
    if (state && code && state === localStorage.getItem('githubState')) {
        const { data: access_token, error } = await useApiFetch<OauthResponse>(
            '/users/auth/github?code=' + code
        );
        if (error.value || !access_token.value.access_token) {
            useToast.error('An error occurred while login with GitHub');
            return navigateTo('/dashboard');
        }

        const params = {
            access_token: `${access_token.value.token_type ?? 'Bearer'} ${
                access_token.value.access_token
            }`
        };

        const { data, error: errorCallback } = await useApiFetch<AuthResponse>(
            `/users/auth/github/callback?${new URLSearchParams(params)}`
        );
        if (errorCallback.value) {
            useToast.error('An error occurred while login with Github');
            return navigateTo('/dashboard');
        }

        setTokenStates({
            accessToken: data.value.access_token,
            refreshToken: data.value.refresh_token
        });
        useToast.success('You are now logged in with GitHub');
    }
    navigateTo('/dashboard');
});
</script>
