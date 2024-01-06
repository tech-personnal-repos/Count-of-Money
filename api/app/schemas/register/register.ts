import { isEmail } from "../validators.js";

const request = {
    type: 'object',
    properties: {
        email: { type: 'string', transform: ['trim'], pattern: isEmail, minLength: 1 },
        username: { type: 'string', transform: ['trim'], minLength: 1},
		password: { type: 'string', transform: ['trim'], minLength: 8 }
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

export default { request, response }
