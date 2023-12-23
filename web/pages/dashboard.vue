<template>
    <Head>
        <Title>Dashboard - Count of Money</Title>
    </Head>

    <div
        class="w-full h-full flex max-lg:flex-col max-lg:overflow-y-auto gap-2"
    >
        <div class="flex flex-col flex-1 gap-4 h-full">
            <DashboardSelectedCoinsVariations
                class="h-full w-full"
                :crypto="coinList?.selectedCrypto ?? null"
            />
            <DashboardFollowedArticleList
                v-if="layout === 'desktop'"
                class="h-2/5 w-full"
            />
        </div>
        <div class="w-[24rem] max-lg:w-full">
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
</script>

<style lang="scss" scoped></style>
