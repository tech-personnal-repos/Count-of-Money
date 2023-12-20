<template>
    <div
        class="py-5 px-4 min-h-[6.25rem] w-full flex items-center h-fit gap-4 cursor-pointer"
        :class="{
            'bg-accent-15': selected,
            'bg-white': !selected
        }"
        @click="emits('select', crypto)"
    >
        <div class="w-14 h-14 rounded-full bg-white overflow-hidden p-2.5">
            <img
                class="w-full h-full"
                :src="crypto.iconUrl"
                :alt="crypto.symbol"
            />
        </div>

        <div class="data">
            <div class="flex flex-col flex-1 justify-center">
                <h4 class="font-bold text-center">{{ crypto.name }}</h4>
                <h5 class="text-accent text-center">{{ crypto.symbol }}</h5>
            </div>

            <p class="font-mb1 text-center">${{ price }}</p>
            <p class="flex-1 font-mb1 text-center">
                ${{ formatDecimalNumber(parseInt(crypto.marketCap)) }}
            </p>

            <div class="flex flex-col justify-center">
                <div class="flex items-center justify-center gap-1">
                    <SvgArrowPolygon
                        :class="{
                            'rotate-180': changeIsNegative
                        }"
                        :color="
                            !changeIsNegative
                                ? 'var(--success)'
                                : 'var(--danger)'
                        "
                    />
                    <p
                        class="font-mb1 text-center"
                        :class="{
                            'text-green': !changeIsNegative,
                            'text-red': changeIsNegative
                        }"
                    >
                        {{ change }}%
                    </p>
                </div>
                <ExploreLittleChart
                    class="!w-14 !h-6"
                    :data="useTestData['data']"
                    :crypto="crypto"
                    :color="
                        changeIsNegative
                            ? useChartColors['danger']
                            : useChartColors['success']
                    "
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    crypto: {
        type: Object as PropType<Coin>,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits<{
    (event: 'select', crypto: Coin): void;
}>();

const changeIsNegative = ref(false);

const price = computed(() => {
    const price = Number(props.crypto.price);
    return price.toFixed(price < 100 ? (price < 1 ? 5 : 4) : 2);
});
const change = computed(() => {
    const change = Number(props.crypto.change);
    changeIsNegative.value = change < 0;
    return change.toFixed(2);
});
</script>

<style lang="scss" scoped>
.data {
    @apply flex justify-between flex-1 items-center;
    @apply bg-white rounded-xl outline outline-8 outline-white;
}
</style>
