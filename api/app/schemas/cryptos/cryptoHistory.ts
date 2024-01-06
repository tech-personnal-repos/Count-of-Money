const request = {
    type: 'object',
    properties: {
        id: { type: 'number' }
    }
};

const response = {
    type: 'object',
    properties: {
        change: { type: 'number', default: 0 },
        history: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    price: { type: 'number', default: 0 },
                    timestamp: { type: 'string', transform: ['trim'] }
                }
            },
            default: []
        }
    }
};

export default { request, response };
