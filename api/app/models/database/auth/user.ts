import crypto from 'crypto';

import type { ObjectId } from 'mongodb';
import type { User } from '../database.js';

import { db } from '../init.js';
import { generatePersonalKey } from './token.js';
import {
    GithubUserResponse,
    GoogleUserResponse
    // GoogleUserResponse
} from '../../../controllers/users/oauth.js';

export async function checkUsernameExist(username: string) {
	const doc = await db.collection('users').findOne({ username });

	if (doc) return Promise.reject({ status: 400, error: 'username already registered' });

	return true;
}

export async function checkEmailExist(email: string) {
    const doc = await db.collection('users').findOne({ email });

    if (doc)
        return Promise.reject({
            status: 400,
            error: 'email address already registered'
        });

    return true;
}

export async function getUserIdWithEmail(email: string) {
    const doc = await db.collection('users').findOne({ email });

    if (!doc)
        return Promise.reject({
            status: 400,
            error: `user with email: ${email} not found`
        });

    return doc._id;
}

export async function checkEmailExistAndNotId(
    email: string,
    _id: ObjectId = undefined
) {
    const doc = await db.collection('users').findOne({ email });

    if (doc && doc._id.toString() !== _id.toString()) {
        return Promise.reject({
            status: 400,
            error: 'email address already defined'
        });
    }

    return true;
}

export async function createUser(newUser: User) {
    if (!newUser || !newUser.email || !newUser.username) {
        return Promise.reject({ status: 400, error: 'new user undefined' });
    }

    const mailAvailable = await checkEmailExist(newUser.email);
    if (!mailAvailable) {
        return mailAvailable;
    }
    const usernameAvailable = await checkUsernameExist(newUser.username);
	if (!usernameAvailable) {
		return usernameAvailable;
	}

    newUser.followedCryptos = [];
    newUser.personalKey = generatePersonalKey();
    newUser.password = crypto
        .createHmac('sha256', process.env.SECRET_HASH)
        .update(newUser.password)
        .digest('hex');

    const response = await db.collection('users').insertOne({ ...newUser });
    return await db.collection('users').findOne({ _id: response.insertedId });
}
export async function getUserWithGithubData(
    user: GithubUserResponse
): Promise<User | null> {
    const doc = await db
        .collection('users')
        .findOne<User>({ githubId: user.id.toString() });

    return doc;
}

export async function createdUserWithGithubData(
    user: GithubUserResponse
): Promise<User> {
    const newUser: User = {
        username: user.login,
        email: user.email,
        githubId: user.id.toString(),
        displayName: user.login || user.name,
        avatarUrl: user.avatar_url,
        personalKey: generatePersonalKey(),
        password: 'githubDefaultPassword'
    };

    const response = await db.collection('users').insertOne({ ...newUser });
    return await db
        .collection('users')
        .findOne<User>({ _id: response.insertedId });
}

export async function getUserWithGoogleData(
    user: GoogleUserResponse
): Promise<User | null> {
    const doc = await db
        .collection('users')
        .findOne<User>({ googleId: user.id.toString() });

    return doc;
}

export async function createdUserWithGoogleData(
    user: GoogleUserResponse
): Promise<User> {
    const newUser: User = {
        username: user.email.split('@')[0],
        email: user.email,
        googleId: user.id.toString(),
        displayName: user.name,
        avatarUrl: user.picture,
        personalKey: generatePersonalKey(),
        password: 'googleDefaultPassword'
    };

    const response = await db.collection('users').insertOne({ ...newUser });
    return await db
        .collection('users')
        .findOne<User>({ _id: response.insertedId });
}

export async function revokeUserToken(_id: ObjectId) {
    const personalKey = generatePersonalKey();
    return await db
        .collection('users')
        .updateOne({ _id }, { $set: { personalKey } });
}
