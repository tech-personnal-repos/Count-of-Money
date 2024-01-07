import {
    isDisplayName,
    isEmail,
    isPassword,
    isUsername
} from '../validators.js';

const request = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            transform: ['trim'],
            pattern: isEmail,
            minLength: 4
        },
        username: {
            type: 'string',
            transform: ['trim'],
            pattern: isUsername,
            minLength: 4
        },
        password: {
            type: 'string',
            transform: ['trim'],
            pattern: isPassword,
            minLength: 8
        },
        displayName: {
            type: 'string',
            transform: ['trim'],
            pattern: isDisplayName,
            minLength: 1
        },
        avatarUrl: { type: 'string', transform: ['trim'] }
    },
    required: ['email', 'password', 'username']
};

const response = {
    type: 'object',
    properties: {
        access_token: { type: 'string', transform: ['trim'], default: null },
        refresh_token: { type: 'string', transform: ['trim'], default: null }
    }
};

export default { request, response };
