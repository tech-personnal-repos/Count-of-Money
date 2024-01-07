// export interface LoginRequest {
// 	email: string;
// 	password: string;
// }

const request = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            transform: ['trim'],
            minLength: 1
        },
        password: { type: 'string', transform: ['trim'], minLength: 1 }
    },
    required: ['username', 'password']
};

const response = {
    type: 'object',
    properties: {
        access_token: { type: 'string', transform: ['trim'], default: null },
        refresh_token: { type: 'string', transform: ['trim'], default: null }
    }
};

export default { request, response };
