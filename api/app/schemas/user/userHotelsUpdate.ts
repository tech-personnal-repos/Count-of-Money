// export interface UpdateUserRequest {
// 	roles: string[];
// }

export default {
	type: 'object',
	properties: {
		hotels: {
			type: 'array',
			items: { type: 'string', transform: ['trim'] },
			default: []
		}
	}
};
