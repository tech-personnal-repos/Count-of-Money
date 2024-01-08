<template>
    <div class="flex flex-col">
        <div
            v-if="cryptos"
            class="flex flex-1 flex-col gap-4 overflow-auto p-3"
        >
            <DynamicScroller
                v-if="loaded"
                page-mode
                :items="cryptos"
                :min-item-size="800"
                :prerender="3"
                tagList="ul"
                tagItems="li"
                keyField="uuid"
            >
                <template v-slot="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[item.name]"
                        :data-index="index"
                        class="p-2"
                    >
                        <ExploreCoinItem
                            class="card"
                            :crypto="item"
                            :selected="
                                followedUUID?.includes(item.uuid) ?? false
                            "
                            @select="selectCrypto"
                            v-observe-visibility="
                                index === cryptos.length - 1
                                    ? cryptosStore.fetchNext
                                    : false
                            "
                        />
                    </DynamicScrollerItem>
                </template>
                <template #after>
                    <h5 class="flex-center">No more cryptos to show</h5>
                </template>
            </DynamicScroller>
        </div>
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

const data = useTestCoins.data.coins;

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
