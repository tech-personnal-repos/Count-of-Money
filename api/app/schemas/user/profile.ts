const request = {
    type: 'object',
    properties: {
        code: { type: 'string' }
    }
};

const response = {
    type: 'object',
    properties: {
        email: { type: 'string', default: null },
        username: { type: 'string' },
        displayName: { type: 'string' },
        roles: { type: 'array', items: { type: 'string' } },
        avatarUrl: { type: 'string', default: null }
    }
};

export default { request, response };
