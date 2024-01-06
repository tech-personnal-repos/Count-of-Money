import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import type { LoggedRequest, Request, Response } from '../../express.js';
import {
    getAllCryptosData,
    getCryptoByUUID
} from '../../../models/database/crypto/cryptoCurrencies.js';
import { CryptoCurrency } from '../../../models/database/database.js';
import { isLogged } from '../../../middleware/authentication.js';
import { getAllFollowedCryptosFromUserId } from '../../../models/database/user/follows.js';
import { configDotenv } from 'dotenv';
import { get } from '../../../helpers/fetch.js';

const router = Router();

router.get(
    '/',
    rateLimiter,
    schemas('cryptoList', { response: true }),
    wrap(async (req: Request, res: Response) => {
        const queryCmids = req.query.cmids;
        let cryptosData: CryptoCurrency[] = [];

        if (!queryCmids) {
            cryptosData = await getAllCryptosData();
        } else {
            let cmids: string[] = [];

            if (Array.isArray(queryCmids)) {
                queryCmids.forEach((id: string | qs.ParsedQs) => {
                    cmids.push(id.toString());
                });
            } else {
                cmids.push(queryCmids.toString());
            }

            for (const cmid of cmids) {
                cryptosData.push(await getCryptoByUUID(cmid));
            }
        }
        res.send({ cryptos: cryptosData });
    })
);

router.get(
    '/followed',
    rateLimiter,
    isLogged,
    schemas('followedCryptos', { response: true }),
    wrap(async (req: LoggedRequest, res: Response) => {
        const followed = await getAllFollowedCryptosFromUserId(req.user._id);
        const resObj: {
            name: string;
            symbol: string;
            iconUrl: string;
            uuid: string;
        }[] = [];
        for (let index = 0; index < followed.length; index++) {
            const followed_cm = followed[index];
            const crypto = await getCryptoByUUID(followed_cm);
            resObj.push({
                name: crypto.name,
                symbol: crypto.symbol,
                iconUrl: crypto.iconUrl,
                uuid: crypto.uuid
            });
        }
        return res.send(resObj);
    })
);

/*
 ** Keep this as last function :')
 ** (if no more routing after :cmid)
 */
router.get(
    '/:cmid',
    rateLimiter,
    wrap(async (req: Request, res: Response) => {
        const cmid: string = req.params['cmid'];
        if (!cmid) {
            res.status(401).send(`Error with parameter 'cmid': ${cmid}`);
            return;
        }
        await getCryptoByUUID(cmid)
            .then(cryptoData => {
                res.send(cryptoData);
            })
            .catch(err => {
                res.send(err);
            });
    })
);

configDotenv();
const coinrankingApiKey: string = process.env.COINRANKING_KEY;
const coinrankingUrlApi: string = 'https://api.coinranking.com/';
const coinrankingVersion: string = 'v2';
const coinrankingCoins: string =
    coinrankingUrlApi + coinrankingVersion + '/coin/:uuid/history';

const options = {
    headers: {
        'x-access-token': coinrankingApiKey
    }
};

router.get(
    '/:cmid/history/:period',
    rateLimiter,
    schemas('cryptoHistory', { response: true }),
    wrap(async (req: Request, res: Response) => {
        const cmid = req.params['cmid'];
        const period = req.params['period'] || '24h';

        const crypto = await getCryptoByUUID(cmid);
        const response = await get(
            coinrankingCoins.replace(':uuid', crypto.uuid) +
                `?timePeriod=${period}`,
            options
        )
            .then(response => response.json())
            .then(response => {
                return response;
            });

        if (response['status'] != 'success') {
            res.send(response);
            return;
        }

        const data: {
            change: string;
            history: { price: string; timestamp: number };
        } = response['data'];
        res.send(data);
    })
);

export default router;
