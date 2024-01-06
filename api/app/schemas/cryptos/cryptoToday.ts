const request = {
    type: 'object',
    properties: {
        cmids: { type: 'array', items: { type: 'number' }, default: []}
    }
};

const response = {
    type: 'object',
    properties: {
        name: { type: 'string', transform: ['trim'] },
        symbol: { type: 'string', transform: ['trim'] },
        iconUrl: { type: 'string', transform: ['trim'] },
        price: { type: 'number', default: 0},
        highestPrice: { type: 'object', properties: {
            price: { type: 'number', default: 0 },
            timestamp: { type: 'number', default: 0}
        }},
        lowestPrice: { type: 'object', properties: {
            price: { type: 'number', default: 0 },
            timestamp: { type: 'number', default: 0}
        }},
        change: { type: 'number', default: 0 }
    }
}

export default { request, response }
