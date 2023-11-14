import { TooltipItem } from 'chart.js';

export const usePercentageOptions = {
	scales: { y: { max: 100, ticks: { maxTicksLimit: 3, callback: (value: string | number) => `${value}%` } } },
	plugins: {
		tooltip: {
			callbacks: { label: ({ formattedValue }: TooltipItem<any>) => `${parseFloat(formattedValue).toFixed()}%` }
		}
	}
};
