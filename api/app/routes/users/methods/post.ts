import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import { wrap } from '../../../middleware/route.js';
import type { Request, Response } from '../../express.js';

import { getGithubToken } from '../../../controllers/users/oauth.js';
import schemas from '../../../middleware/schemas.js';

const router = Router();

router.post(
    '/auth/github',
    rateLimiter,
    schemas('oauth'),
    wrap(async (req: Request, res: Response) => {
        const code = req.body.code;
        if (!code) {
            return res.status(401).send(`Error with parameter 'code': ${code}`);
        }

        await getGithubToken(code);
        res.send(true);
    })
);

router.post(
    '/auth/google',
    rateLimiter,
    schemas('oauth'),
    wrap(async (req: Request, res: Response) => {
        const { code } = req.body;
        if (!code) {
            res.status(401).send(`Error with parameter 'code': ${code}`);
            return;
        }
    })
);

export default router;
