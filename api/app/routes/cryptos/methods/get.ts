import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import type { LoggedRequest, Request, Response } from '../../express.js';
import {
    getAllCryptosData,
    getCryptoByUUID,
    getCryptoByUUIDS
} from '../../../models/database/crypto/cryptoCurrencies.js';
import { CryptoCurrency } from '../../../models/database/database.js';
import { isLogged } from '../../../middleware/authentication.js';
import { getAllFollowedCryptosFromUserId } from '../../../models/database/user/follows.js';
import { configDotenv } from 'dotenv';
import { get } from '../../../helpers/fetch.js';

const router = Router();

configDotenv();
const coinrankingApiKey: string = process.env.COINRANKING_KEY;
const coinrankingUrlApi: string = 'https://api.coinranking.com/';
const coinrankingVersion: string = 'v2';
const coinrankingCoinDetails: string =
    coinrankingUrlApi + coinrankingVersion + '/coin/:uuid';
const coinrankingHistory: string =
    coinrankingUrlApi + coinrankingVersion + '/coin/:uuid/history';

const options = {
    headers: {
        'x-access-token': coinrankingApiKey
    }
};

router.get(
    '/',
    rateLimiter,
    schemas('cryptoList', { response: true }),
    wrap(async (req: Request, res: Response) => {
        const queryCmids = req.query.cmids;
        let cryptosData: CryptoCurrency[] = [];

        const limit = req.query.limit
            ? parseInt(req.query.limit.toString())
            : 10;
        const skip = req.query.skip ? parseInt(req.query.skip.toString()) : 0;

        if (!queryCmids) {
            cryptosData = await getAllCryptosData(limit, skip);
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
        if (!followed?.length ?? 0) res.send([]);
        else return res.send(await getCryptoByUUIDS(followed ?? []));
    })
);

/*
 ** Keep this as last function :')
 ** (if no more routing after :cmid)
 */
router.get(
    '/:cmid',
    rateLimiter,
    schemas('cryptoInfos', { response: true }),
    wrap(async (req: Request, res: Response) => {
        const cmid: string = req.params['cmid'];

        if (!cmid) {
            res.status(401).send(`Error with parameter 'cmid': ${cmid}`);
            return;
        }

        const response = await get(
            coinrankingCoinDetails.replace(':uuid', cmid),
            options
        ).then(response => response.json());

        if (response['status'] != 'success') {
            res.send(response);
            return;
        }
        res.send(response['data']['coin']);
    })
);

router.get(
    '/:cmid/history/:period',
    rateLimiter,
    schemas('cryptoHistory', { response: true }),
    wrap(async (req: Request, res: Response) => {
        const cmid = req.params['cmid'];
        let period = req.params['period'];
        let valid_period: boolean = false;

        const allowed_periods: string[] = [
            '1h',
            '3h',
            '12h',
            '24h',
            '7d',
            '30d',
            '3m',
            '1y',
            '3y',
            '5y'
        ];

        allowed_periods.forEach(allowed_period => {
            if (period == allowed_period) {
                valid_period = true;
                return;
            }
        });
        if (!valid_period) {
            period = '24h';
        }
        const response = await get(
            coinrankingHistory.replace(':uuid', cmid) + `?timePeriod=${period}`,
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
            history: { price: string; timestamp: number }[];
        } = response['data'];
        res.send(data);
    })
);

export default router;
