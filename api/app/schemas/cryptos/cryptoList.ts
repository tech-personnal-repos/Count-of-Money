const response = {
    type: 'object',
    properties: {
        cryptos: {
            type: 'array',
            default: [],
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', transform: ['trim'] },
                    symbol: { type: 'string', transform: ['trim'] },
                    iconUrl: { type: 'string', transform: ['trim'] },
                    uuid: { type: 'string', transform: ['trim'] },
                    price: { type: 'number', default: 0 },
                    change: { type: 'number', default: 0 },
                    marketCap: { type: 'number', default: 0 },
                    sparkline: {
                        type: 'array',
                        default: [],
                        items: {
                            type: 'number',
                            default: 0
                        }
                    }
                }
            }
        }
    }
};

export default { response };
