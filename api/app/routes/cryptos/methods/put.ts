import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import { wrap } from '../../../middleware/route.js';
import { configDotenv } from 'dotenv';
import { get } from '../../../helpers/fetch.js';
import type { Request, Response } from '../../express.js';
import { CryptoCurrency } from '../../../models/database/database.js';
import { createCrypto } from '../../../models/database/crypto/cryptoCurrencies.js';



const router = Router();

configDotenv();
const coinrankingApiKey: string = process.env.COINRANKING_KEY;
const coinrankingUrlApi: string = 'https://api.coinranking.com/';
const coinrankingVersion: string = 'v2';
const coinrankingCoins: string = coinrankingUrlApi + coinrankingVersion + '/coins';

const options = {
    headers: {
        'x-access-token': coinrankingApiKey,
    },
};

router.put(
    '/update',
    rateLimiter,
    wrap(async (req: Request, res: Response) => {
        const response = await get(coinrankingCoins, options)
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        if (response['status'] != 'success') {
            res.send(response);
            return;
        }
        for (const coin of response['data']['coins']) {
            const newCrypto: CryptoCurrency = {
                name: coin['name'],
                symbol: coin['symbol'],
                uuid: coin['uuid'],
                iconUrl: coin['iconUrl'],
                price: coin['price'],
                highestPrice: 0,
                highestPriceTimestamp: "0",
                supplyCirculating: 0,
                supplyTotal: 0
            }
            const created = await createCrypto(newCrypto);
            if (!created) {
                res.send(created);
                return;
            }
        }
        res.send("updated");
    })
);

export default router;