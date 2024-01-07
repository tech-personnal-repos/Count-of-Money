import crypto from 'crypto';

import { generatePasswordHash, generatePersonalKey } from '../auth/token.js';

import { db } from '../init.js';

import { ObjectId } from 'mongodb';
import type { Projection, User } from '../database.js';

export async function getAllUsersData() {
    return await db.collection('users').find<User>({}).toArray();
}

export async function getAllUsersInGroup(group: ObjectId) {
    return await db.collection('users').find<User>({ _group: group }).toArray();
}

export async function getUserDataById(
    _id: ObjectId,
    projection = { _id: 0 } as Projection
) {
    const doc = await db
        .collection('users')
        .findOne<User>({ _id }, { projection });

    return doc ? doc : Promise.reject({ status: 404, error: 'user not found' });
}

export async function getUserDataWithUsernamePassword(
    username: string,
    password: string,
    projection = { _id: 0 } as Projection
) {
    if (!username || !password) {
        return Promise.reject({
            status: 401,
            error: 'invalid username or password'
        });
    }

    const userData = await db
        .collection('users')
        .findOne<User>({ username, password }, { projection });

    if (userData) return userData;
    return Promise.reject({
        status: 401,
        error: 'invalid username or password'
    });
}

export async function getUserDataWithEmailPassword(
    email: string,
    password: string,
    projection = { _id: 0 } as Projection
) {
    if (!email || !password) {
        return Promise.reject({
            status: 401,
            error: 'invalid email or password'
        });
    }

    const user = await db
        .collection('users')
        .findOne<User>(
            { email, password: generatePasswordHash(password) },
            { projection }
        );

    if (user) return user;
    return Promise.reject({ status: 401, error: 'invalid email or password' });
}

export async function checkPasswordForUserIdIsCorrect(
    _id: ObjectId,
    password: string
) {
    if (!_id || !password) {
        return false;
    }

    const user = await db
        .collection('users')
        .findOne<User>({ _id, password: generatePasswordHash(password) });
    if (user) return true;
    return false;
}

export async function updateUserPassword(_id: ObjectId, password: string) {
    if (!_id) return Promise.reject({ status: 404, error: 'user not found' });
    if (!password)
        return Promise.reject({ status: 404, error: 'missing new password' });

    const personalKey = generatePersonalKey();

    const cPassword = crypto
        .createHmac('sha256', process.env.SECRET_HASH)
        .update(password)
        .digest('hex');
    const doc = await db
        .collection('users')
        .updateOne({ _id }, { $set: { password: cPassword, personalKey } });

    return doc && doc.matchedCount !== 0
        ? doc
        : Promise.reject({ status: 404, error: 'user not found' });
}

export async function updateUserById(_id: ObjectId, user: Partial<User>) {
    if (!_id) return Promise.reject({ status: 404, error: 'user not found' });
    if (!user)
        return Promise.reject({ status: 404, error: 'missing new user data' });

    const personalKey = generatePersonalKey();
    const doc = await db
        .collection('users')
        .findOneAndUpdate(
            { _id },
            { $set: { ...user, personalKey } },
            { returnDocument: 'after' }
        );

    return doc
        ? (doc as User)
        : Promise.reject({ status: 404, error: 'user not found' });
}

export async function updateUserRolesById(_id: ObjectId, roles: string[]) {
    if (!_id) return Promise.reject({ status: 404, error: 'user not found' });
    if (!roles)
        return Promise.reject({ status: 404, error: 'missing new user data' });

    const personalKey = generatePersonalKey();
    const doc = await db
        .collection('users')
        .findOneAndUpdate(
            { _id },
            { $set: { roles, personalKey } },
            { returnDocument: 'after' }
        );

    return doc
        ? (doc as User)
        : Promise.reject({ status: 404, error: 'user not found' });
}

export async function deleteUserById(_id: ObjectId) {
    if (!_id) return Promise.reject({ status: 404, error: 'user not found' });

    const doc = await db.collection('users').findOneAndDelete({ _id });
    return doc ? doc : Promise.reject({ status: 404, error: 'user not found' });
}
