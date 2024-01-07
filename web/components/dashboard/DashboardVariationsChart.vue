<template>
    <div class="w-full h-full">
        <Line
            ref="chart"
            class="h-full w-full"
            :data="data"
            :options="options"
        />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    data: {
        type: Object as PropType<CoinHistory['history']>,
        required: true
    },
    crypto: {
        type: Object as PropType<Coin | null>,
        required: true
    },
    period: {
        type: String,
        required: true
    }
});

const labels = ref([] as string[]);
const datasets = ref(
    [] as {
        data: (number | null)[];
        borderColor: string;
        tension?: number;
        pointRadius?: number;
        pointBackgroundColor?: string;
        label: string;
        borderWidth?: number;
        borderDash?: number[];
        backgroundColor: any;
        fill?: any;
    }[]
);

const minValue = ref(0);
const maxValue = ref(Infinity);

const graphMax = computed(() => maxValue.value + maxValue.value * 0.03);
const graphMin = computed(() => minValue.value - minValue.value * 0.03);

function mapDataset() {
    minValue.value = Math.min(...props.data.map(d => Number(d.price)));
    maxValue.value = Math.max(...props.data.map(d => Number(d.price)));

    const history = props.data.sort((a, b) =>
        a.timestamp < b.timestamp ? -1 : 1
    );

    labels.value = history.map(d => {
        return String(d.timestamp);
    });

    datasets.value = [
        {
            data: history.map(d => Number(d.price)),
            label: 'Price',
            borderColor: useChartColors['primary'],
            tension: 0.2,
            borderWidth: 2,
            fill: true,
            backgroundColor: (context: any) => {
                if (!context.chart.chartArea) {
                    return useChartColors['primary-0'];
                }

                const {
                    ctx,
                    chartArea: { top, bottom }
                } = context.chart;

                const colors = [
                    useChartColors['primary'],
                    useChartColors['primary-80'],
                    useChartColors['primary-60'],
                    useChartColors['primary-40'],
                    useChartColors['primary-20'],
                    useChartColors['primary-0']
                ];
                const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0, colors[1]);
                gradient.addColorStop(0.2, colors[2]);
                gradient.addColorStop(0.4, colors[3]);
                gradient.addColorStop(0.8, colors[4]);
                gradient.addColorStop(1, colors[5]);
                return gradient;
            }
        }
    ];
}

watch(() => props.data, mapDataset, { immediate: true });

const localOptions: (typeof options)['value'] = {
    layout: {
        padding: {
            bottom: 20
        }
    },
    scales: {
        y: {
            display: true,
            min: graphMin.value,
            max: graphMax.value,
            ticks: {
                display: false,
                stepSize: Math.round((maxValue.value - minValue.value) / 1.3),
                align: 'center'
            },
            grid: {
                color: ctx => {
                    if (
                        ctx.tick.value ===
                        Math.round(maxValue.value + maxValue.value * 0.03)
                    ) {
                        return useChartColors['hidden'];
                    }
                    return useChartColors['accent-15'];
                }
            },
            border: {
                display: false
            }
        },
        x: {
            display: true,
            ticks: {
                display: true,
                maxTicksLimit: 7,
                align: 'center',
                callback: (value: any, index: any, tick: any) => {
                    if (props.period === '1D') {
                        return formatTimeToHuman(
                            //@ts-ignore
                            new Date(Number(labels.value[index] * 1000))
                        );
                    }
                    return formatDateToHuman(
                        //@ts-ignore
                        new Date(Number(labels.value[index] * 1000)),
                        false
                    );
                }
            },
            grid: {
                display: false
            },
            border: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },

        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                title: (ctx: any) => {
                    if (props.period === '1D') {
                        return formatTimeToHuman(
                            new Date(Number(ctx[0].label * 1000))
                        );
                    }
                    return formatDateToHuman(
                        new Date(Number(ctx[0].label * 1000)),
                        true
                    );
                },
                label: (context: any) => {
                    const label = context.dataset.label || '';
                    if (label) {
                        return `${label}: $${formatFloatNumber(
                            context.parsed.y
                        )}`;
                    }
                    return '$' + formatFloatNumber(context.parsed.y);
                }
            }
        }
    }
};

const { Line, data } = useLineChart(labels, datasets, false);
const options = ref(useLineChartGenerateDefaultOptions());

merge<(typeof options)['value']>(options.value, localOptions);
</script>

<style lang="scss" scoped></style>
