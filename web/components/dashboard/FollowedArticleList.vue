<template>
    <div class="flex flex-col">
        <h3>Article relating followed cryptos</h3>
        <ul class="flex flex-1 flex-col gap-4 overflow-auto p-3">
            <li v-for="crypto in cryptos" :key="crypto.uuid">
                <DashboardFollowedCoinItem :crypto="crypto" class="card" />
            </li>
        </ul>
    </div>
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
