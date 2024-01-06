const response = {
    type: 'object',
    properties: {
        followed: {
            type: 'array',
            default: [],
            items: {
                type: 'object', properties: {
                    name: { type: 'string', transform: ['trim'] },
                    symbol: { type: 'string', transform: ['trim'] },
                    iconUrl: { type: 'string', transform: ['trim'] },
                    uuid: { type: 'string', transform: ['trim'] }
                }
            }
        }
    }
}

export default { response }