<template>
    <UiLoaderAbsolute />
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'empty' });

const route = useRoute();

const state = route.query.state as string;
const code = route.query.code as string;

onMounted(async () => {
    if (state && code && state === localStorage.getItem('googleState')) {
        await useApiFetch('/users/oauth/google', {
            method: 'POST',
            body: { code }
        });
    }
    navigateTo('/dashboard');
});
</script>
