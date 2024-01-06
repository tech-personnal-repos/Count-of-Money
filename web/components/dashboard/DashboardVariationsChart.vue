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
        type: Object as PropType<(typeof useTestData)['data']>,
        required: true
    },
    crypto: {
        type: Object as PropType<Coin | null>,
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

function mapDataset() {
    minValue.value = Math.min(...props.data.history.map(d => Number(d.price)));
    maxValue.value = Math.max(...props.data.history.map(d => Number(d.price)));

    const history = props.data.history.sort((a, b) =>
        a.timestamp < b.timestamp ? -1 : 1
    );

    labels.value = history.map(d => {
        const date = new Date(d.timestamp * 1000);
        return formatTimeToHuman(date);
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
            min: Math.round(minValue.value - minValue.value * 0.03),
            max: Math.round(maxValue.value + maxValue.value * 0.03),
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
                align: 'center'
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
            intersect: false
        }
    }
};

const { Line, data } = useLineChart(labels, datasets, false);
const options = ref(useLineChartGenerateDefaultOptions());

merge<(typeof options)['value']>(options.value, localOptions);
</script>

<style lang="scss" scoped></style>
