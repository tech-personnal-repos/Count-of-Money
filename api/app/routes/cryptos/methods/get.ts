import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import type { LoggedRequest, Request, Response } from '../../express.js';
import { getAllCryptosData, getCryptoById, getCryptoByUUID } from '../../../models/database/crypto/cryptoCurrencies.js';
import { ObjectId } from 'mongodb';
import { CryptoCurrency } from '../../../models/database/database.js';
import { isLogged } from '../../../middleware/authentication.js';
import { getAllFollowedCryptosFromUserId } from '../../../models/database/user/follows.js';

const router = Router();

router.get(
    '/',
    rateLimiter,
    wrap(async (req: Request, res: Response) => {
        const queryCmids = req.query.cmids;
        if (!queryCmids) {
            res.send(await getAllCryptosData());
            return;
        }

        let response: CryptoCurrency[] = [];
        let cmids: string[] = []
        
        if (Array.isArray(queryCmids)) {
            queryCmids.forEach((id: string | qs.ParsedQs) => {
                cmids.push(id.toString());
            });
        } else {
            cmids.push(queryCmids.toString());
        }
        for (const cmid of cmids) {
            const objId: ObjectId = ObjectId.createFromHexString(cmid);
            await getCryptoById(objId).then((cryptoData) => {
                response.push(cryptoData);
            }).catch((err) => {
                res.send(err);
            });
        }
        res.send(response);
    })
);

router.get(
    "/followed",
    rateLimiter,
    isLogged,
    schemas("followedCryptos", { response: true }),
    wrap(async (req: LoggedRequest, res: Response) => {
        const followed = await getAllFollowedCryptosFromUserId(req.user._id);
        const resObj: {name: string, symbol: string, iconUrl: string, uuid: string}[] = [];
        for (let index = 0; index < followed.length; index++) {
            const followed_cm = followed[index];
            const crypto = await getCryptoByUUID(followed_cm);
            resObj.push({name: crypto.name, symbol: crypto.symbol, iconUrl: crypto.iconUrl, uuid: crypto.uuid})
        }
        return res.send(resObj);
    })
);


/*
** Keep this as last function :')
*/
router.get(
    "/:cmid",
    rateLimiter,
    wrap(async (req: Request, res: Response) => {
        const cmid: string = req.params['cmid'];
        if (!cmid) {
            res.status(401).send(`Error with parameter 'cmid': ${cmid}`);
            return;
        }
        const objId: ObjectId = ObjectId.createFromHexString(cmid);
        await getCryptoById(objId).then((cryptoData) => {
            res.send(cryptoData);
        }).catch((err) => {
            res.send(err);
        });
    }
));

export default router;