<template>
    <div class="flex flex-col">
        <h3 class="my-1 ml-1">Followed cryptos</h3>
        <ul class="flex flex-1 flex-col gap-4 overflow-auto p-3">
            <li v-for="crypto in cryptos" :key="crypto.uuid">
                <DashboardFollowedCoinItem
                    class="card"
                    :crypto="crypto"
                    :selected="selectedCrypto === crypto"
                    @select="selectCrypto"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useCryptosStore } from '@/store/cryptos';

const cryptosStore = useCryptosStore();
const { cryptos } = storeToRefs(cryptosStore);
useMountedFetch(() => {
    console.log('fetching cryptos');
    if (!cryptos.value) cryptosStore.fetchCryptos();
});

const selectedCrypto = ref(null as Coin | null);

defineExpose({
    selectedCrypto
});

watchOnce(cryptos, () => {
    selectedCrypto.value = cryptos.value?.at(0) || null;
});

function selectCrypto(crypto: Coin) {
    selectedCrypto.value = crypto;
}
</script>

<style lang="scss" scoped></style>
