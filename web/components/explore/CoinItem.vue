<template>
    <div
        class="py-5 md:px-4 px-2 min-h-[6.25rem] w-full flex items-center h-fit max-sm:gap-2 sm:gap-4 bg-white"
    >
        <div class="flex flex-wrap justify-center gap-1 items-center">
            <div>
                <SvgStar
                    class="w-8 h-8 max-sm:w-6 max-sm:h-6 cursor-pointer"
                    :isFilled="selected"
                    @click="emits('select', crypto)"
                />
            </div>
            <div
                class="w-14 h-14 max-sm:w-10 max-sm:h-10 rounded-full bg-white overflow-hidden p-2"
            >
                <img
                    class="w-full h-full"
                    :src="crypto.iconUrl"
                    :alt="crypto.symbol"
                />
            </div>
        </div>

        <div class="data">
            <div class="flex flex-col flex-1 justify-center">
                <h4 class="text-center max-sm:font-h5">{{ crypto.name }}</h4>
                <h5 class="text-accent text-center max-sm:font-mb1">
                    {{ crypto.symbol }}
                </h5>
            </div>

            <div class="flex flex-wrap gap-2 flex-1 justify-center">
                <p class="font-mb1 max-sm:font-legendb text-center">
                    ${{ price }}
                </p>
                <p class="flex-1 font-mb1 max-sm:font-legendb text-center">
                    ${{ formatPrices(parseInt(crypto.marketCap)) }}
                </p>
            </div>

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
                        class="font-mb1 max-sm:font-legendb text-center"
                        :class="{
                            'text-green': !changeIsNegative,
                            'text-red': changeIsNegative
                        }"
                    >
                        {{ change }}%
                    </p>
                </div>
                <ExploreLittleChart
                    class="!w-14 !h-6 max-sm:!w-12 max-sm:!h-4"
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
    @apply flex justify-between flex-1 items-center gap-2;
    @apply bg-white rounded-xl outline outline-8 outline-white;
}
</style>
