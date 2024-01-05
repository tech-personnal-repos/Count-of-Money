const request = {
    type: 'object',
    properties: {
        code: { type: 'string' }
    }
};

const response = {
    type: 'object',
    properties: {
        access_token: { type: 'string' },
        token_type: { type: 'string' },
        scope: { type: 'string' }
    }
};

export default { request, response };
