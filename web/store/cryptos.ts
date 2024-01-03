import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCryptosStore = defineStore('useCryptosStore', () => {
    const cryptos = ref(null as Coin[] | null);
    const isFetching = ref(false);

    async function fetchCryptos() {
        if (isFetching.value) return;
        const { data } = await useApiFetch<Coin[]>('/cryptos/');
        cryptos.value = data.value;
    }

    return {
        cryptos,

        fetchCryptos
    };
});
