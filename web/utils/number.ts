export function roundHalf(num: number) {
	return Math.round(num * 2) / 2;
}

export function formatFloatNumber(num: number) {
    return num.toLocaleString('en-UK', { maximumFractionDigits: 2 });
}

export function formatDecimalNumber(num: number) {
    return num.toLocaleString('en-UK', { maximumFractionDigits: 4 });
}

export function formateHalfRoundedNumber(num: number) {
	return formatFloatNumber(roundHalf(num));
}

function commarizeWithFormat(number: number, formatFunction: (value: number | bigint) => string, min = 1e6) {
	min = min || 1e3;

	if (number >= min) {
		const units = ['K', 'M', 'B', 'T'];
		const order = Math.floor(Math.log(number) / Math.log(1000));
		const unitname = units[order - 1];
		const num = formatFunction(number / 1000 ** order);

		return num + unitname;
	}

	return formatFunction(number);
}


export function diffPercentage(firstValue: number | null, secondValue: number | null) {
	if (!secondValue || secondValue == null) return 0;
	return Math.round(((firstValue ?? 0) * 100) / secondValue) - 100;
}

export function padStartZero(number: number | string, length: number = 2) {
	if (typeof number === 'string') return number.padStart(length, '0');
	return number.toString().padStart(length, '0');
}

export function minMax(numbers: any[], callback: Function = (n: number) => n) {
	return numbers.reduce(
		({ min, max }, cur: any) => {
			const value = callback(cur) as number;

			min = Math.min(min, value);
			max = Math.max(max, value);

			return { min, max };
		},
		{ min: Infinity, max: -Infinity } as { min: number; max: number }
	);
}

export function msToTime(ms: number) {
	if (ms < 1000) return `${formatFloatNumber(ms)}ms`;

	let seconds = ms / 1000;
	if (seconds < 60) return `${formatFloatNumber(seconds)}s`;

	let minutes = ms / (1000 * 60);
	if (minutes < 60) return `${formatFloatNumber(minutes)}min`;

	let hours = ms / (1000 * 60 * 60);
	if (hours < 24) return `${formatFloatNumber(hours)}h`;

	let days = ms / (1000 * 60 * 60 * 24);
	return `${formatFloatNumber(days)}d`;
}