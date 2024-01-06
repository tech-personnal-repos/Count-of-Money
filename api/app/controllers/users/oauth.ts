import { get, post } from '../../helpers/fetch.js';
import {
    createdUserWithGithubData,
    createdUserWithGoogleData,
    // createdUserWithGoogleData,
    getUserWithGithubData,
    getUserWithGoogleData
    // getUserWithGoogleData
} from '../../models/database/auth/user.js';
import { generateUserTokens } from '../auth/token.js';

export async function getGithubToken(code: string) {
    if (!code)
        return Promise.reject({ status: 400, error: 'code not defined' });

    const params = {
        code: code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
    };

    const response = await post(
        `${process.env.GITHUB_TOKEN_URI}?${new URLSearchParams(params)}`,
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );

    return await response.json();
}

export interface GithubUserResponse {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    name?: string;
    email?: string;
}

export async function handleGithubLogin(access_token: string) {
    const response = await get(`${process.env.GITHUB_USER_URI}`, {
        headers: {
            Authorization: access_token
        }
    });

    const user = (await response.json()) as GithubUserResponse;

    if (!user)
        return Promise.reject({
            status: 401,
            error: 'Error with parameter access_token'
        });

    let dbUser = await getUserWithGithubData(user);
    if (!dbUser) dbUser = await createdUserWithGithubData(user);
    delete dbUser.password;

    return await generateUserTokens(dbUser.username, 'githubDefaultPassword');
}

export async function getGoogleToken(code: string) {
    if (!code)
        return Promise.reject({ status: 400, error: 'code not defined' });

    const response = await post(process.env.GOOGLE_TOKEN_URI, {
        json: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        }
    });

    return await response.json();
}

export interface GoogleUserResponse {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export async function handleGoogleLogin(access_token: string) {
    const response = await get(process.env.GOOGLE_USER_URI, {
        headers: {
            Authorization: access_token
        }
    });

    const user = (await response.json()) as GoogleUserResponse;

    if (!user)
        return Promise.reject({
            status: 401,
            error: 'Error with parameter access_token'
        });

    let dbUser = await getUserWithGoogleData(user);
    if (!dbUser) dbUser = await createdUserWithGoogleData(user);
    delete dbUser.password;

    return await generateUserTokens(dbUser.username, 'googleDefaultPassword');
}
