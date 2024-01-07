import Logger from '../../config/logger.js';
import { get } from '../../helpers/fetch.js';
import { CryptoCurrency } from '../../models/database/database.js';
import { db } from '../../models/database/init.js';

interface CoinsResponse {
    status: string;
    data: {
        stats: {
            total: number;
            totalCoins: number;
            totalMarkets: number;
            totalExchanges: number;
            totalMarketCap: string;
            total24hVolume: string;
            sparkline: Array<string>;
        };
        coins: CryptoCurrency[];
    };
}

export async function refreshCoinList() {
    //https://coinranking.com/api/v2/coins?offset=0&orderBy=marketCap&limit=50&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=

    const url = 'https://coinranking.com/api/v2/coins';
    const params = {
        offset: '0',
        orderBy: 'marketCap',
        limit: '50',
        orderDirection: 'desc',
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        search: ''
    };

    const coins = [];

    let i = 0;

    while (i < 100) {
        params.offset = i.toString();
        params.limit = (i + 50).toString();
        const response = await get(`${url}?${new URLSearchParams(params)}`);
        let data = null;

        try {
            data = (await response.json()) as CoinsResponse;
        } catch (err) {
            continue;
        }

        if (data.status !== 'success') {
            Logger.error('Error while updating coin list');
            return;
        }

        for (const coin of data.data.coins) {
            coins.push({
                updateOne: {
                    filter: { uuid: coin.uuid },
                    update: {
                        $set: {
                            name: coin.name,
                            symbol: coin.symbol,
                            uuid: coin.uuid,
                            iconUrl: coin.iconUrl,
                            price: coin.price,
                            change: coin.change,
                            marketCap: coin.marketCap,
                            sparkline: coin.sparkline
                        }
                    },
                    upsert: true
                }
            });
        }
        i += 50;
    }

    db.collection('cryptos').bulkWrite(coins);
    Logger.info('Coin list updated successfully !');
}
