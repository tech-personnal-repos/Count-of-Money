import { post } from '../../helpers/fetch.js';

export async function getGithubToken(code: string) {
    if (!code)
        return Promise.reject({ status: 400, error: 'code not defined' });

    console.log(process.env.GITHUB_TOKEN_URI);
    const response = await post(process.env.GITHUB_TOKEN_URI, {
        json: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        }
    });

    console.log(response);
    return response;
}
export async function getGoogleToken(code: string) {
    if (!code)
        return Promise.reject({ status: 400, error: 'code not defined' });

    const response = await post(process.env.GOOGLE_TOKEN_URL, {
        json: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        }
    });

    console.log(response);
    return response;
}
