import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
// import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import type { Request, Response } from '../../express.js';
import { getAllCryptosData, getCryptoById } from '../../../models/database/crypto/cryptoCurrencies.js';
import { ObjectId } from 'mongodb';
import { CryptoCurrency } from '../../../models/database/database.js';

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
        let cmids: number[] = []
        
        if (Array.isArray(queryCmids)) {
            queryCmids.forEach((id: string | qs.ParsedQs) => {
                id = id.toString();
                const parsed: number = parseInt(id);
                if (isNaN(parsed))
                    return;
                cmids.push(parseInt(id));
            });
        }
        cmids.forEach(async (id) => {
            const cryptoId = new ObjectId(id);
            const cryptoData: CryptoCurrency = await getCryptoById(cryptoId);
            response.push(cryptoData);
        });

        res.send(response);
    })
);

export default router;