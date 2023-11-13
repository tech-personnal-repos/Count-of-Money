import { isEmail } from '../validators.js';

const request = {
	type: 'object',
	properties: {
		email: { type: 'string', pattern: isEmail, transform: ['trim'] }
	},

	required: ['email']
};

export default { request };
