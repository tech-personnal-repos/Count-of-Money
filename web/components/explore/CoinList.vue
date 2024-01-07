<template>
    <div class="flex flex-col">
        <ul class="flex flex-1 flex-col gap-4 overflow-auto p-3" v-if="loaded">
            <li v-for="crypto in cryptos" :key="crypto.uuid">
                <ExploreCoinItem
                    class="card"
                    :crypto="crypto"
                    :selected="followedUUID?.includes(crypto.uuid) ?? false"
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

const followedUUID = ref([] as string[]);
const loaded = ref(false);

useMountedFetch(async () => {
    const promises = [];
    if (!cryptos.value) promises.push(cryptosStore.fetchCryptos());
    if (!followed.value) promises.push(cryptosStore.fetchFollowed());
    await Promise.all(promises);
    loaded.value = true;
});

watch(
    followed,
    () => {
        followedUUID.value = followed.value?.map(c => c.uuid) || [];
    },
    { deep: true, immediate: Boolean(followed.value) }
);

function selectCrypto(crypto: Coin) {
    cryptosStore.followCrypto(crypto);
}
</script>

<style lang="scss" scoped></style>
