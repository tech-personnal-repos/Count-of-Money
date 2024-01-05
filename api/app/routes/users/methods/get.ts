import { Router } from 'express';
import { rateLimiter } from '../../../middleware/bruteforce.js';
import { wrap } from '../../../middleware/route.js';
import type { Request, RequestWithQuery, Response } from '../../express.js';

import {
    getGithubToken,
    getGoogleToken,
    handleGithubLogin,
    handleGoogleLogin
} from '../../../controllers/users/oauth.js';
import schemas from '../../../middleware/schemas.js';

const router = Router();

type OauthRequest = Request &
    RequestWithQuery<{
        code: string;
    }>;

type CallbackRequest = Request &
    RequestWithQuery<{
        access_token: string;
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

        const token = await getGithubToken(code);
        res.send(token);
    })
);

router.get(
    '/auth/github/callback',
    wrap(async (req: CallbackRequest, res: Response) => {
        const { access_token: github_access_token } = req.query;

        if (!github_access_token) {
            res.status(401).send(
                `Error with parameter 'access_token': ${github_access_token}`
            );
            return;
        }

        const { access_token, refresh_token } =
            await handleGithubLogin(github_access_token);

        res.cookie('token', access_token, {
            domain: 'localhost',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        })
            .cookie('refresh_token', refresh_token, {
                domain: 'localhost',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            })
            .send({ access_token, refresh_token });
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
        const token = await getGoogleToken(code);
        res.send(token);
    })
);

router.get(
    '/auth/google/callback',
    wrap(async (req: CallbackRequest, res: Response) => {
        const { access_token: google_access_token } = req.query;

        if (!google_access_token) {
            res.status(401).send(
                `Error with parameter 'access_token': ${google_access_token}`
            );
            return;
        }

        const { access_token, refresh_token } =
            await handleGoogleLogin(google_access_token);

        res.cookie('token', access_token, {
            domain: 'localhost',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        })
            .cookie('refresh_token', refresh_token, {
                domain: 'localhost',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            })
            .send({ access_token, refresh_token });
    })
);

export default router;
