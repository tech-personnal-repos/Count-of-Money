import { Bar } from 'vue-chartjs';
import {
	Chart,
	ChartOptions,
	ChartData,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement
} from 'chart.js';

import { useChartColors } from './useChartColors';

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

export function useBarChartGenerateOptions(): ChartOptions<'bar'> {
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
				border: { display: false },
				ticks: { font: { family: "'Montserrat', sans-serif" } },
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
				borderColor: useChartColors['blue-light']
			},
			datalabels: {
				display: false
			}
		},
		maintainAspectRatio: false,
		locale: 'fr-FR'
	};
}

export function useBarChart(
	labels: Ref<ChartData<'bar'>['labels']>,
	datasets: Ref<ChartData<'bar'>['datasets']>,
	generateOptions: boolean = true
) {
	const options = generateOptions ? computed(useBarChartGenerateOptions) : ({} as Ref<ChartOptions<'bar'>>);
	const colors = labels.value?.map((_, i) => (i % 2 ? useChartColors['gold-light'] : useChartColors['gold']));

	const data = computed<ChartData<'bar'>>(() => ({
		labels: labels.value,
		datasets: datasets.value.map(dataset => ({
			borderRadius: 10,
			backgroundColor: colors,
			...dataset
		}))
	}));

	return {
		Bar,
		data,
		options
	};
}
