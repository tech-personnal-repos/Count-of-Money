<template>
    <ul class="flex flex-col gap-4 overflow-auto">
        <li v-for="crypto in cryptos" :key="crypto.uuid">
            <DashboardFollowedCoinItem :crypto="crypto" class="card" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useCryptosStore } from '@/store/cryptos';

const cryptosStore = useCryptosStore();
const { cryptos } = storeToRefs(cryptosStore);
useMountedFetch(() => {
    if (!cryptos.value) cryptosStore.fetchCryptos();
});
</script>

<style lang="scss" scoped></style>
