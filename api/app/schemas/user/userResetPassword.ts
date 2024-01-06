const request = {
	type: 'object',
	properties: {
		password: { type: 'string', transform: ['trim'], minLength: 8 },
		token: { type: 'string', transform: ['trim'] }
	},

	required: ['password', 'token']
};

export default { request };
