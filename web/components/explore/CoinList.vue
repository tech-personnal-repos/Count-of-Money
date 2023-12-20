<template>
    <div class="flex flex-col">
        <ul class="flex flex-1 flex-col gap-4 overflow-auto p-3">
            <li v-for="crypto in cryptos" :key="crypto.uuid">
                <ExploreCoinItem
                    class="card"
                    :crypto="crypto"
                    :selected="selectedCrypto.includes(crypto)"
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

const selectedCrypto = ref([] as Coin[]);

defineExpose({
    selectedCrypto
});

useMountedFetch(() => {
    if (!cryptos.value) cryptosStore.fetchCryptos();
});

function selectCrypto(crypto: Coin) {
    selectedCrypto.value.push(crypto);
}
</script>

<style lang="scss" scoped></style>
