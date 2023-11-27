import { Line } from 'vue-chartjs';
import {
	Chart,
	ChartOptions,
	ChartData,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement
} from 'chart.js';
import { useChartColors } from './useChartColors';
import { useLineConfig } from './useLineConfig';

import DragData from 'chartjs-plugin-dragdata';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, DragData);

export function useLineChartGenerateDefaultOptions(): ChartOptions<'line'> {
	return {
		scales: {
			x: {
				ticks: { font: { family: "'Montserrat', sans-serif" } },
				grid: {
					color: ({ tick }) => {
						if (!tick || tick.value !== 0) return useChartColors['hidden'];
						return useChartColors['gold'];
					}
				}
			},
			y: {
				beginAtZero: true,
				border: { display: true },
				ticks: {
					font: { family: "'Montserrat', sans-serif" }
				},
				grid: {
					color: ({ tick }) => {
						if (tick.value !== 0) return useChartColors['light-2'];
						return useChartColors['gold'];
					}
				}
			}
		},
		plugins: {
			legend: { display: false },
			title: { display: false },
			tooltip: {
				backgroundColor: useChartColors['light-1'],
				titleColor: useChartColors['blue'],
				bodyColor: useChartColors['blue'],
				borderWidth: 1,
				borderColor: useChartColors['blue-light'],
				usePointStyle: true
			},
			datalabels: {
				display: false
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		locale: 'fr-FR'
	};
}

export function useLineChart(
	labels: Ref<ChartData<'line'>['labels']>,
	datasets: Ref<ChartData<'line'>['datasets']>,
	generateOptions: boolean = true,
	colorsSwap: boolean = true
) {
	const options = generateOptions ? computed(useLineChartGenerateDefaultOptions) : ({} as Ref<ChartOptions<'line'>>);
	const colors = colorsSwap
		? labels.value?.map((_, i) => (i % 2 ? useChartColors['gold-light'] : useChartColors['gold']))
		: useChartColors['blue'];

	const data = computed<ChartData<'line'>>(() => ({
		labels: labels.value,
		datasets: datasets.value.map(dataset => ({
			...useLineConfig,
			...dataset,
			backgroundColor: colors
		}))
	}));

	return {
		Line,
		data,
		options
	};
}
