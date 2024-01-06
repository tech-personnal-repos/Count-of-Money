const request = {
	type: 'object',
	properties: {
		oldPassword: { type: 'string', transform: ['trim']},
		newPassword: { type: 'string', transform: ['trim'], minLength: 8 }
	},

	required: ['oldPassword', 'newPassword']
};

export default { request };
