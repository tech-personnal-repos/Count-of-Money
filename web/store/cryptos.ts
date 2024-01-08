import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCryptosStore = defineStore('useCryptosStore', () => {
    const cryptos = ref(null as Coin[] | null);
    const followed = ref(null as Coin[] | null);
    let isEnd = false;

    function isLogged() {
        return useCookie('refresh_token').value ? true : false;
    }

    async function fetchCryptos() {
        const { data } = await useApiFetch<{ cryptos: Coin[] }>('/cryptos/', {
            params: {
                limit: 15,
                skip: 0
            }
        });
        cryptos.value = data.value.cryptos;
    }

    async function fetchNext() {
        if (isEnd) return;
        const { data } = await useApiFetch<{ cryptos: Coin[] }>('/cryptos/', {
            params: {
                limit: 15,
                skip: cryptos.value?.length ?? 0
            }
        });
        if (!data.value.cryptos) isEnd = true;

        cryptos.value?.push(...data.value.cryptos);
    }

    async function fetchFollowed() {
        if (!isLogged()) return;
        const { data } = await useApiFetch<Coin[]>('/cryptos/followed');
        followed.value = data.value;
    }

    async function followCrypto(coin: Coin) {
        if (!isLogged())
            return useToast.error('You must be logged in to follow a crypto');

        const { data, error } = await useApiFetch<{
            followed: boolean;
            state: boolean;
        }>('/cryptos/follow', {
            method: 'put',
            body: { cryptoId: coin.uuid }
        });

        if (error.value) return useToast.error('An error occurred');

        if (data.value.followed) {
            followed.value?.push(coin);
            useToast.success(`${coin.name} is now followed`);
        } else {
            followed.value?.splice(
                followed.value?.findIndex(value => value.uuid == coin.uuid),
                1
            );
            useToast.success(`${coin.name} is now unfollowed`);
        }
    }

    return {
        cryptos,
        followed,

        fetchCryptos,
        fetchNext,

        fetchFollowed,
        followCrypto
    };
});
