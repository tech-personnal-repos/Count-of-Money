// export interface UpdateUserRequest {
// 	roles: string[];
// }

export default {
	type: 'object',
	properties: {
		roles: {
			type: 'array',
			items: { type: 'string', transform: ['trim'] },
			default: []
		}
	}
};
