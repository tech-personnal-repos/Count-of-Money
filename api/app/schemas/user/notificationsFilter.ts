const request = {
	type: 'object',
	properties: {
		filterWallet: { type: 'boolean', default: true },

		hotelClosed: { type: 'boolean', default: true },
		hotelReopened: { type: 'boolean', default: true },
		booked: { type: 'boolean', default: true },
		canceled: { type: 'boolean', default: true },
		longStay: { type: 'boolean', default: true },
		multipleReservations: { type: 'boolean', default: true },

		agencies: { type: 'boolean', default: true },
		roomTypes: { type: 'boolean', default: true },
		rooms: { type: 'boolean', default: true },
		options: { type: 'boolean', default: true },
		rates: { type: 'boolean', default: true }
	}
};

const response = {
	type: 'object',
	properties: {
		filterWallet: { type: 'boolean' },

		hotelClosed: { type: 'boolean' },
		hotelReopened: { type: 'boolean' },
		booked: { type: 'boolean' },
		canceled: { type: 'boolean' },
		longStay: { type: 'boolean' },
		multipleReservations: { type: 'boolean' },

		agencies: { type: 'boolean' },
		roomTypes: { type: 'boolean' },
		rooms: { type: 'boolean' },
		options: { type: 'boolean' },
		rates: { type: 'boolean' }
	}
};

export default { request, response };
