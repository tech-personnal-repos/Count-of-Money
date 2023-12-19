export function merge<T extends Record<string, any>>(overridden: T, payload: T) {
	for (const [key, val] of Object.entries(payload)) {
		if (val !== null && typeof val === `object`) {
			// @ts-ignore
			if (overridden[key] === undefined) overridden[key] = new val.__proto__.constructor();
			merge(overridden[key], val);
			// @ts-ignore
		} else overridden[key] = val;
	}

	return overridden;
}

export function isDeepEqual(obj1: any, obj2: any) {
	if (obj1 === obj2) return true;

	if (typeof obj1 !== typeof obj2) return false;
	if (typeof obj1 !== 'object' && obj1 !== obj2) return false;

	const entries1 = Object.entries(obj1);
	const entries2 = Object.entries(obj2);

	if (entries1.length !== entries2.length) return false;

	for (const [key, value] of entries1) {
		if (typeof value === 'object') {
			if (!isDeepEqual(value, obj2[key])) return false;

			continue;
		}

		if (value !== obj2[key]) return false;
	}

	return true;
}
