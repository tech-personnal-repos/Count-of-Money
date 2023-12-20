<template>
    <Head>
        <Title>Dashboard - Count of Money</Title>
    </Head>

    <div
        class="w-full h-full flex max-lg:flex-col max-lg:overflow-y-auto gap-2"
    >
        <div class="w-full">
            <ExploreCoinList class="h-full w-full" ref="coinList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useScreenStore } from '~/store/screen';
import ExploreCoinList from '@/components/explore/CoinList.vue';

const { layout } = useScreenStore();
const coinList = ref(
    null as InstanceType<typeof ExploreCoinList> | null
);


</script>

<style lang="scss" scoped></style>
