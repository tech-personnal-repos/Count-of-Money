import { ObjectId } from 'mongodb';
import { jwtDecode } from 'jwt-decode';

import { getTokenInRequest, isTokenValid } from '../controllers/auth/token.js';

import type { NextFunction, Response } from 'express';
import type { LoggedRequest } from '../routes/express.js';
import type { User } from '../models/database/database.js';
import type { RequestWithQueryAndCookies } from '../controllers/auth/token.js';
import { getUserDataById } from '../models/database/user/user.js';

interface DecodedToken {
    id: string;
    email: User['email'];
    username: User['username'];
    roles: User['roles'];
}

export async function isLogged(
    req: LoggedRequest,
    res: Response,
    next: NextFunction
) {
    const token = await getTokenInRequest(
        req as unknown as RequestWithQueryAndCookies
    );

    if (
        !token ||
        !token.match(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    ) {
        return res.status(401).send('you are not allowed');
    }

    const decoded = jwtDecode<DecodedToken>(token);
    if (
        !decoded ||
        !decoded.id ||
        !decoded.email ||
        !decoded.username /*|| decoded.roles.includes('api')*/
    ) {
        return res.status(401).send('you are not allowed');
    }

    const userId = new ObjectId(decoded.id);
    const { personalKey } = await getUserDataById(userId, {
        personalKey: 1
    });

    if (!personalKey || !(await isTokenValid(token, personalKey)))
        return res.status(401).send('you are not allowed');

    req.token = token;
    req.user = {
        _id: userId,
        email: decoded.email,
        personalKey,
        roles: decoded.roles || [],
        username: decoded.username
    };

    next();
}

export async function isLoggedWithRefresh(
    req: LoggedRequest,
    res: Response,
    next: NextFunction
) {
    const token = await getTokenInRequest(
        req as unknown as RequestWithQueryAndCookies
    );

    if (!token) return res.status(401).send('you are not allowed');

    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded || !decoded.id || !decoded.email || !decoded.username) {
        return res.status(401).send('you are not allowed');
    }

    const userId = new ObjectId(decoded.id);
    const { email, roles, username, personalKey } = await getUserDataById(
        userId,
        {
            _group: 1,
            email: 1,
            roles: 1,
            username: 1,
            personalKey: 1
        }
    );

    if (!(await isTokenValid(token, undefined, true))) {
        return res.status(401).send('you are not allowed');
    }

    req.token = token;

    req.user = {
        _id: new ObjectId(decoded.id),
        email,
        personalKey,
        roles,
        username
    };

    next();
}

export async function isNotLogged(
    req: LoggedRequest,
    res: Response,
    next: NextFunction
) {
    const token = await getTokenInRequest(
        req as unknown as RequestWithQueryAndCookies
    );

    if (!token) return next();

    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded || !decoded.id || !decoded.email || !decoded.username) {
        return next();
    }

    const userId = new ObjectId(decoded.id);
    const { personalKey } = await getUserDataById(userId, {
        personalKey: 1
    });

    if (!(await isTokenValid(token, personalKey))) return next();

    req.token = token;
    req.user = {
        _id: userId,
        email: decoded.email,
        personalKey,
        roles: decoded.roles || [],
        username: decoded.username
    };

    next();
}
