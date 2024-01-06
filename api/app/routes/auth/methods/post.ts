import { Router } from 'express';

const router = Router();

import schemas from '../../../middleware/schemas.js';
import { wrap } from '../../../middleware/route.js';

import {
    refreshUserTokens,
    generateUserTokens
} from '../../../controllers/auth/token.js';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import { isLoggedWithRefresh } from '../../../middleware/authentication.js';

import type { Request, Response, LoggedRequest } from '../../express.js';

router.post(
    '/',
    rateLimiter,
    schemas('login'),
    wrap(async (req: Request, res: Response) => {
        const tokens = await generateUserTokens(
            req.body.email,
            req.body.password
        );
        res.send(tokens);
    })
);

router.post(
    '/refresh',
    isLoggedWithRefresh,
    schemas('login', { response: true }),
    wrap(async (req: LoggedRequest, res: Response) => {
        const token = await refreshUserTokens(req.user);
        res.send(token);
    })
);

export default router;
