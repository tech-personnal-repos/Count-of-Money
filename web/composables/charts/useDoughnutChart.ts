import { Doughnut } from 'vue-chartjs';
import {
	Chart,
	ChartOptions,
	ChartData,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	ArcElement
} from 'chart.js';
import { useChartColors } from './useChartColors';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

export function useDoughnutChartGenerateDefaultOptions(): ChartOptions<'doughnut'> {
	return {
		plugins: {
			legend: { display: true, position: 'right' },
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

export function useDoughnutChart(
	labels: Ref<ChartData<'doughnut'>['labels']>,
	datasets: Ref<ChartData<'doughnut'>['datasets']>,
	generateOptions: boolean = true
) {
	const options = generateOptions
		? computed(useDoughnutChartGenerateDefaultOptions)
		: ({} as Ref<ChartOptions<'doughnut'>>);
	const colors = labels.value?.map((_, i) => (i % 2 ? useChartColors['gold-light'] : useChartColors['gold']));

	const data = computed<ChartData<'doughnut'>>(() => ({
		labels: labels.value,
		datasets: datasets.value.map(dataset => ({
			borderRadius: 10,
			...dataset
		}))
	}));

	return {
		Doughnut,
		data,
		options
	};
}
