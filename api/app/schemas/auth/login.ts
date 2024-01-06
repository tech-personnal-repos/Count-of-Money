import { isEmail } from '../validators.js';

// export interface LoginRequest {
// 	email: string;
// 	password: string;
// }

const request = {
	type: 'object',
	properties: {
		email: { type: 'string', transform: ['trim'], pattern: isEmail, minLength: 1 },
		password: { type: 'string', transform: ['trim'], minLength: 1 }
	},
	required: ['email', 'password']
};

const response = {
	type: 'object',
	properties: {
		access_token: { type: 'string', transform: ['trim'], default: null },
		refresh_token: { type: 'string', transform: ['trim'], default: null }
	}
};

export default { request, response };
