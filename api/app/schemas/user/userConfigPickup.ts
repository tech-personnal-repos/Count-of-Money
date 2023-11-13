// type PickupRows = { name: string; enabled: boolean; colored: boolean; description: string };

export default {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string', transform: ['trim'] },
			enabled: { type: 'boolean', default: false },
			colored: { type: 'boolean', default: false },
			description: { type: 'string', transform: ['trim'] }
		}
	}
};
