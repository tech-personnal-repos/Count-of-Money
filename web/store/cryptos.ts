import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTestCoins } from '~/composables/useTestData';

export const useCryptosStore = defineStore('useCryptosStore', () => {
    const cryptos = ref(null as Coin[] | null);
    const isFetching = ref(false);

    async function fetchCryptos() {
        if (isFetching.value) return;
        // console.log('fetching cryptos');
        // isFetching.value = true;
        // const response = await useFetch<{
        //     status: string;
        //     data: { stats: any; coins: Coin[] };
        // }>(
        //     'https://coinranking.com/api/v2/coins?offset=0&orderBy=marketCap&limit=50&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=',
        // );
        // isFetching.value = false;
        // const data = response.data.value;
        // if (!data || data.status !== 'success') {
            cryptos.value = useTestCoins.data.coins ?? [];
        //     return;
        // }
        // cryptos.value = data.data.coins;
        // console.log(cryptos.value);
    }

    return {
        cryptos,

        fetchCryptos
    };
});
