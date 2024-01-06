<template>
    <Head>
        <Title>Dashboard - Count of Money</Title>
    </Head>

    <div
        class="w-full flex max-lg:flex-col max-lg:overflow-y-auto gap-2 h-full"
    >
        <div class="flex lg:flex-1 flex-col gap-4 md:h-full h-1/2">
            <DashboardSelectedCoinsVariations
                class="w-full h-full"
                :key="charRefreshKey"
                :crypto="coinList?.selectedCrypto ?? null"
            />
            <!-- add  "lg:h-3/5" class if restore articles
                <DashboardFollowedArticleList
                v-if="layout === 'desktop'"
                class="h-[calc(40%-1rem)] w-full"
            /> -->
        </div>
        <div class="lg:w-[24rem] lg:h-full w-full h-1/2">
            <DashboardFollowedCoinList class="h-full w-full" ref="coinList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useScreenStore } from '~/store/screen';
import DashboardFollowedCoinList from '@/components/dashboard/FollowedCoinList.vue';

const { layout } = useScreenStore();
const coinList = ref(
    null as InstanceType<typeof DashboardFollowedCoinList> | null
);

const charRefreshKey = ref(0);

useMountedFetch(() => {
    useEventBus.on('screen_resized', () => {
        charRefreshKey.value++;
    });
});
</script>

<style lang="scss" scoped></style>
