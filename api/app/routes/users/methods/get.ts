import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import { wrap } from '../../../middleware/route.js';
import type { Request, RequestWithQuery, Response } from '../../express.js';

import { getGithubToken } from '../../../controllers/users/oauth.js';
import schemas from '../../../middleware/schemas.js';

const router = Router();

type OauthRequest = Request &
    RequestWithQuery<{
        code: string;
    }>;

router.get(
    '/auth/github',
    rateLimiter,
    schemas('oauth', { response: true }),
    wrap(async (req: OauthRequest, res: Response) => {
        const code = req.query.code;

        if (!code) {
            res.status(401).send(`Error with parameter 'code': ${code}`);
            res.send(false);
        }

        await getGithubToken(code);
        res.send(true);
    })
);

router.get(
    '/auth/google',
    rateLimiter,
    schemas('oauth', { response: true }),
    wrap(async (req: OauthRequest, res: Response) => {
        const { code } = req.query;

        if (!code) {
            res.status(401).send(`Error with parameter 'code': ${code}`);
            return;
        }
    })
);

export default router;
