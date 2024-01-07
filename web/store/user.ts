import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('useUserStore', () => {
    const user = ref(null as User | null);

    const followedCryptos = ref(null as string[] | null);

    function isLogged() {
        return useCookie('refresh_token').value ? true : false;
    }

    async function fetchUser() {
        if (!isLogged()) return;

        const { data } = await useApiFetch<User>('/users/profile');

        if (!data || !data.value) return;
        user.value = data.value;
    }

    return {
        user,
        fetchUser
    };
});
