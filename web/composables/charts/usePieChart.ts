import { Pie } from 'vue-chartjs';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useChartColors } from './useChartColors';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement, ChartDataLabels);

export function usePieChartGenerateDefaultOptions(): ChartOptions<'pie'> {
	return {
		plugins: {
			legend: { display: true, position: 'right', align: 'center' },
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

export function usePieChart(
	labels: Ref<ChartData<'pie'>['labels']>,
	datasets: Ref<ChartData<'pie'>['datasets']>,
	generateOptions: boolean = true
) {
	const options = generateOptions ? computed(usePieChartGenerateDefaultOptions) : ({} as Ref<ChartOptions<'pie'>>);

	const data = computed<ChartData<'pie'>>(() => ({
		labels: labels.value,
		datasets: datasets.value.map(dataset => ({
			backgroundColor: ['#1f2145', '#63647d', '#e0886a', '#2e2b28', '#cda06b', '#000000'],
			borderRadius: 5,
			...dataset
		}))
	}));

	return {
		Pie,
		data,
		options
	};
}
