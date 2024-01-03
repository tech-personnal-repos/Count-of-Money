const request = {
    type: 'object',
    properties: {
        cryptoId: { type: 'string', transform: ['trim'], minLength: 1 },
    },
    required: ['cryptoId']
};

const response = {
    type: 'object',
	properties: {
		state: { type: 'boolean', default: false },
	}
};

export default { request, response }
