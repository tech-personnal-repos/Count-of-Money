<template>
    <div class="flex flex-col">
        <div class="flex w-full items-center h-fit max-sm:flex-col">
            <h3 v-if="layout !== 'mobile'">
                Price variations on {{ crypto?.name ?? 'crypto' }}
            </h3>
            <h4 v-else>{{ crypto?.name ?? 'Price variations' }}</h4>
            <DashboardPeriodSelector class="ml-auto" ref="selector" />
        </div>
        <DashboardVariationsChart
            class="w-full flex-1"
            :data="data.data"
            :crypto="crypto"
        />
    </div>
</template>

<script lang="ts" setup>
import DashboardPeriodSelector from '@/components/dashboard/PeriodSelector.vue';
import { useScreenStore } from '~/store/screen';

defineProps({
    crypto: {
        type: Object as PropType<Coin | null>,
        required: true
    }
});

const screenStore = useScreenStore();
const { layout } = storeToRefs(screenStore);

const selector = ref(
    null as InstanceType<typeof DashboardPeriodSelector> | null
);

const data = useTestData;
</script>

<style lang="scss" scoped></style>
