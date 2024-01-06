import { isEmail, isName, isObjectID } from '../validators.js';

export interface CreateUserRequest {
	email: string;
	username: string;
	roles: string[];
	config: {
		pickup: object;
		lta: object;
		colorblindView: object;
		wallets: { [key: string]: string[] };
	};
}

const request = {
	type: 'object',
	properties: {
		email: { type: 'string', transform: ['trim'], minLength: 1, pattern: isEmail },
		username: { type: 'string', transform: ['trim'], minLength: 1, pattern: isName },
		groupId: { type: 'string', transform: ['trim'], default: '' },
		roles: {
			type: 'array',
			items: { type: 'string', transform: ['trim'] },
			default: []
		},
		config: {
			type: 'object',
			properties: {
				pickup: {},
				lta: {},
				colorblindView: {},
				wallets: {
					type: 'object',
					patternProperties: {
						'.+': {
							type: 'array',
							items: { type: 'string', transform: ['trim'] }
						}
					}
				}
			},
			default: {
				pickup: {},
				lta: {},
				colorblindView: {},
				wallets: {
					'Mon portefeuille': []
				}
			}
		}
	}
};

const response = {
	type: 'object',
	properties: {
		_id: { type: 'string', transform: ['trim'], pattern: isObjectID },
		_group: { type: 'string', transform: ['trim'], default: '' },
		email: { type: 'string' },
		username: { type: 'string' },
		hotelAccess: { type: 'array', items: { type: 'string' }, default: [] },
		roles: {
			type: 'array',
			items: { type: 'string' },
			default: []
		}
	}
};

export default { request, response };
