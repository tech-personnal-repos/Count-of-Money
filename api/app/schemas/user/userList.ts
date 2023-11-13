import { isObjectID } from '../validators.js';

const response = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			_id: { type: 'string', transform: ['trim'], pattern: isObjectID },
			email: { type: 'string', transform: ['trim'], minLength: 1 },
			username: { type: 'string', transform: ['trim'], minLength: 1 },
			creationDate: { type: 'string', transform: ['trim'], minLength: 1 },
			hotelsAccess: { type: 'array', items: { type: 'string', transform: ['trim'], minLength: 1 } },
			_group: { type: 'string', transform: ['trim'], minLength: 1 },
			roles: {
				type: 'array',
				items: { type: 'string', transform: ['trim'] },
				default: []
			}
		}
	}
};

export default { response };
