<template>
    <div class="flex flex-col">
        <div class="flex w-full items-center">
            <h3>Price variations on selected crypto</h3>
            <DashboardPeriodSelector class="ml-auto" ref="selector" />
        </div>
        <div>
            <DashboardVariationsChart
                class="w-full flex-1 h-full"
                :data="data.data"
                :crypto="crypto"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import DashboardPeriodSelector from '@/components/dashboard/PeriodSelector.vue';

defineProps({
    crypto: {
        type: Object as PropType<Coin | null>,
        required: true
    }
});

const selector = ref(
    null as InstanceType<typeof DashboardPeriodSelector> | null
);

const data = useTestData;
</script>

<style lang="scss" scoped></style>
