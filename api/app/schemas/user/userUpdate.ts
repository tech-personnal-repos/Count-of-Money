import { isEmail, isName } from '../validators.js';

export interface UpdateUserRequest {
	email: string;
	username: string;
	password: string;
	// roles: string[];
	// hotelsAccess: string[];
	config: {
		pickup: { coloredPrices: boolean };
		lta: { numberOfDays: number; wallet: string[] };
		colorblindView: { colorblind: string };
		wallets: { [key: string]: string[] };
	};
}

export default {
	type: 'object',
	properties: {
		email: { type: 'string', transform: ['trim'], minLength: 1, pattern: isEmail },
		username: { type: 'string', transform: ['trim'], minLength: 1, pattern: isName },
		// hotelsAccess: { type: 'array', items: { type: 'string', transform: ['trim'], minLength: 1 } },
		password: { type: 'string', transform: ['trim'], minLength: 1 },
		// roles: {
		// 	type: 'array',
		// 	items: { type: 'string', transform: ['trim'] }
		// },
		config: {
			type: 'object',
			properties: {
				pickup: {
					type: 'object',
					properties: {
						coloredPrices: { type: 'boolean' }
					}
				},
				lta: {
					type: 'object',
					properties: {
						numberOfDays: { type: 'number' },
						wallet: { type: 'array', items: { type: 'string', transform: ['trim'] } }
					}
				},
				colorblindView: {
					type: 'object',
					properties: {
						colorblind: { type: ['string', 'null'] }
					}
				},
				wallets: {
					type: 'object',
					patternProperties: {
						'.+': {
							type: 'array',
							items: { type: 'string', transform: ['trim'] }
						}
					}
				}
			}
		}
	}
};
