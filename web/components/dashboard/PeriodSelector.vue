<template>
    <div class="flex gap-1">
        <div
            v-for="period in periods"
            class="p-1 text-center cursor-pointer rounded-md"
            :class="{ 'bg-accent-15': period === selectedPeriod }"
            @click="selectPeriod(period)"
        >
            <h5>{{ period }}</h5>
        </div>
    </div>
</template>

<script lang="ts" setup>
const periods = ['1D', '1W', '1M', '1Y', 'MAX'];
const selectedPeriod = ref(periods[0]);

defineExpose({
    selectedPeriod
});

function selectPeriod(period: string) {
    selectedPeriod.value = period;
}
</script>

<style lang="scss" scoped></style>
