<template>
    <div class="flex flex-col relative">
        <div class="flex w-full items-center h-fit max-sm:flex-col">
            <h3 v-if="layout !== 'mobile'">
                Price variations on {{ crypto?.name ?? 'crypto' }}
            </h3>
            <h4 v-else>{{ crypto?.name ?? 'Price variations' }}</h4>
            <DashboardPeriodSelector class="ml-auto" ref="selector" />
        </div>
        <DashboardVariationsChart
            v-if="loaded && crypto"
            class="w-full flex-1"
            :data="graphData"
            :crypto="crypto"
            :period="selector?.selectedPeriod ?? '1D'"
            :key="crypto.uuid"
        />
        <UiLoaderAbsolute v-else />
    </div>
</template>

<script lang="ts" setup>
import DashboardPeriodSelector from '@/components/dashboard/PeriodSelector.vue';
import { useScreenStore } from '~/store/screen';

const loaded = ref(true);

const props = defineProps({
    crypto: {
        type: Object as PropType<Coin | null>,
        required: true
    }
});

const periodObj = {
    '1D': '24H',
    '1W': '7d',
    '1M': '30d',
    '1Y': '1y',
    MAX: '5y'
};

const selector = ref(
    null as InstanceType<typeof DashboardPeriodSelector> | null
);

const graphData = ref([] as CoinHistory['history']);

watch(
    () => [props.crypto, selector.value?.selectedPeriod],
    async () => {
        if (!props.crypto) return;
        loaded.value = false;
        const period = selector.value?.selectedPeriod
            ? periodObj[
                  selector.value?.selectedPeriod as keyof typeof periodObj
              ]
            : '24h';

        const { data } = await useApiFetch<CoinHistory>(
            `cryptos/${props.crypto?.uuid}/history/${period}`
        );
        if (!data.value) return;
        graphData.value = data.value.history;
        loaded.value = true;
    },
    { deep: true, immediate: true }
);

const screenStore = useScreenStore();
const { layout } = storeToRefs(screenStore);
</script>

<style lang="scss" scoped></style>
