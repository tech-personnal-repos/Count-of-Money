import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTestCoins } from '~/composables/useTestData';

export const useCryptosStore = defineStore('useCryptosStore', () => {
    const cryptos = ref(null as Coin[] | null);

    async function fetchCryptos() {
        console.log('fetching cryptos');
        const response = await useFetch<{
            status: string;
            data: { stats: any; coins: Coin[] };
        }>(
            'https://coinranking.com/api/v2/coins?offset=0&orderBy=marketCap&limit=50&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        const data = response.data.value;
        if (!data || data.status !== 'success') {
            cryptos.value = useTestCoins.data.coins ?? [];
            return;
        }
        cryptos.value = data.data.coins;
        console.log(cryptos.value);
    }

    return {
        cryptos,

        fetchCryptos
    };
});
