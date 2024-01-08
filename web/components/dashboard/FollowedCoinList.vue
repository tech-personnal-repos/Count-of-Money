<template>
    <div class="flex flex-col relative">
        <h3 class="my-1 ml-1 max-sm:font-h4 max-sm:text-center">
            Followed cryptos
        </h3>
        <ul v-if="loaded" class="flex flex-1 flex-col gap-4 overflow-auto p-3">
            <li v-for="crypto in followed" :key="crypto.uuid">
                <DashboardFollowedCoinItem
                    class="card"
                    :crypto="crypto"
                    :selected="selectedCrypto === crypto"
                    @select="selectCrypto"
                />
            </li>
        </ul>
        <UiLoaderAbsolute v-else />
    </div>
</template>

<script lang="ts" setup>
import { useCryptosStore } from '@/store/cryptos';

const cryptosStore = useCryptosStore();
const { cryptos, followed } = storeToRefs(cryptosStore);

const loaded = ref(false);

useMountedFetch(async () => {
    const promises = [];
    if (!cryptos.value) promises.push(cryptosStore.fetchCryptos());
    if (!followed.value) promises.push(cryptosStore.fetchFollowed());
    await Promise.all(promises);
    if (!followed.value || !followed.value.length)
        followed.value = cryptos.value?.slice(0, 5) || [];
    selectedCrypto.value = followed.value[0] ?? null;
    loaded.value = true;
});

const selectedCrypto = ref(null as Coin | null);

defineExpose({
    selectedCrypto
});

function selectCrypto(crypto: Coin) {
    selectedCrypto.value = crypto;
}
</script>

<style lang="scss" scoped></style>
