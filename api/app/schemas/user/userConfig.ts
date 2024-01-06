export default {
	type: 'object',
	properties: {
		wallet: { type: 'array', items: { type: 'string', transform: ['trim'] }, default: [] },
		filterWallet: { type: 'boolean', default: false },

		pickup: {
			type: 'object',
			properties: {
				coloredPrices: { type: 'boolean', default: false },
				rows: {
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
				}
			}
		},

		lta: {
			type: 'object',
			properties: {
				numberOfDays: { type: 'number', default: 14 }
			}
		},

		colorblindView: {
			type: 'object',
			properties: {
				colorblind: { type: ['string', 'null'], default: null }
			}
		},

		dashboard: { type: 'array', items: { type: 'string', transform: ['trim'] }, default: [] },

		wallets: {
			type: 'object',
			patternProperties: {
				'.+': {
					type: 'array',
					items: { type: 'string', transform: ['trim'] }
				}
			}
		},

		notifications: {
			type: 'object',
			properties: {
				filterWallet: { type: 'boolean', default: false },
				hotelClosed: { type: 'boolean', default: false },
				hotelReopened: { type: 'boolean', default: false },
				booked: { type: 'boolean', default: false },
				canceled: { type: 'boolean', default: false },
				longStay: { type: 'boolean', default: false },
				multipleReservations: { type: 'boolean', default: false },
				agencies: { type: 'boolean', default: false },
				roomTypes: { type: 'boolean', default: false },
				rooms: { type: 'boolean', default: false },
				options: { type: 'boolean', default: false },
				rates: { type: 'boolean', default: false }
			}
		}
	}
};
