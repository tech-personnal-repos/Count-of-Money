const request = {
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: []
};

const response = {
    type: 'object',
    properties: {
        name: { type: 'string', transform: ['trim'] },
        symbol: { type: 'string', transform: ['trim'] },
        iconUrl: { type: 'string', transform: ['trim'] },
        price: { type: 'number', default: 0},
        change: { type: 'number', default: 0},
        marketCap: { type: 'number', default: 0},
        highestPrice: { type: 'object', properties: {
            price: { type: 'number', default: 0 },
            timestamp: { type: 'string', default: 0}
        }},
        supply: { type: 'object', properties: {
            circulating: { type: 'number', default: 0 },
            total: { type: 'number', default: 0 }
        }}
    }
}

export default { request, response }
