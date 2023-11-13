import jwt from 'jsonwebtoken';

import {
    createUserRefreshToken,
    createUserToken
} from '../../models/database/auth/token.js';

import type { LoggedRequest, RequestWithQuery } from '../../routes/express.js';
import { getUserDataWithEmailPassword } from '../../models/database/user/user.js';

export interface RequestWithQueryAndCookies
    extends RequestWithQuery<{ token: string }> {
    cookies: { token: string };
}

export async function getTokenInRequest(
    request: RequestWithQueryAndCookies
): Promise<string | null> {
    if (!request) return null;
    else if (
        request.headers &&
        request.headers.authorization &&
        request.headers.authorization.split(' ')[0] === 'Bearer'
    )
        return request.headers.authorization.split(' ')[1];
    else if (request.query && request.query.token) return request.query.token;
    else if (request.cookies && request.cookies.token)
        return request.cookies.token;
    else return null;
}

export async function isTokenValid(
    token: string,
    key: string | undefined,
    isRefresh = false
): Promise<boolean> {
    if (!token) return false;

    const isValid = await new Promise<boolean>(resolve => {
        const completeKey = isRefresh
            ? process.env.JWT_REFRESH_SECRET
            : `${key}${process.env.JWT_SECRET}`;

        jwt.verify(token, completeKey, error => {
            resolve(error ? false : true);
        });
    });

    return isValid;
}

export async function generateUserTokens(email: string, password: string) {
    const user = await getUserDataWithEmailPassword(email, password, {
        _id: 1,
        email: 1,
        username: 1,
        roles: 1,
        _group: 1,
        personalKey: 1
    });

    const accessToken = createUserToken(
        user.personalKey,
        user._id.toString(),
        user.email,
        user.username,
        user.roles || []
    );

    const refreshToken = createUserRefreshToken(
        user._id.toString(),
        user.email,
        user.username,
        user.roles || []
    );

    return { access_token: accessToken, refresh_token: refreshToken };
}

export async function refreshUserTokens(user: LoggedRequest['user']) {
    const nToken = createUserToken(
        user.personalKey,
        user._id.toString(),
        user.email,
        user.username,
        user.roles || []
    );

    const refreshToken = createUserRefreshToken(
        user._id.toString(),
        user.email,
        user.username,
        user.roles || []
    );

    return { access_token: nToken, refresh_token: refreshToken };
}
