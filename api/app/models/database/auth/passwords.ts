import { db } from '../init.js';
import type { ObjectId } from 'mongodb';

export async function getPasswordTokenInTable(token: string) {
	if (!token) return Promise.reject({ status: 400, error: 'user not defined' });

	return await db.collection('passwords_tokens').findOne({ token: token });
}

export async function deletePasswordTokenInTable(token: string) {
	if (!token) return Promise.reject({ status: 400, error: 'user not defined' });

	return await db.collection('passwords_tokens').deleteOne({ token: token });
}

export async function insertPasswordToken(token: string, userId: ObjectId) {
	if (!token || !userId) return Promise.reject({ status: 400, error: 'token or user not defined' });

	return await db
		.collection('passwords_tokens')
		.updateOne({ _user: userId }, { $set: { token: token } }, { upsert: true });
}
