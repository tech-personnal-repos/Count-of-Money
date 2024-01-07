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
import { createUser, login } from '../../../models/database/auth/user.js';

router.post(
    '/login',
    rateLimiter,
    schemas('login'),
    wrap(async (req: Request, res: Response) => {
        const tokens = await login(req.body.username, req.body.password);
        res.send(tokens);
    })
);

router.post(
    '/register',
    rateLimiter,
    schemas('register'),
    wrap(async (req: Request, res: Response) => {
        const newUser = await createUser(req.body);

        const tokens = await generateUserTokens(
            newUser.username,
            newUser.password
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
