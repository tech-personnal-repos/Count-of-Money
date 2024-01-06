const response = {
	type: 'object',
	properties: {
		email: { type: 'string', transform: ['trim'], minLength: 1 },
		username: { type: 'string', transform: ['trim'], minLength: 1 }
	}
};

export default { response };
