import type { ObjectId } from 'mongodb';
import type { User } from '../database.js';

import { db } from '../init.js';
import { generatePersonalKey } from './token.js';

export async function checkEmailExist(email: string) {
	const doc = await db.collection('users').findOne({ email });

	if (doc) return Promise.reject({ status: 400, error: 'email address already registered' });

	return true;
}

export async function getUserIdWithEmail(email: string) {
	const doc = await db.collection('users').findOne({ email });

	if (!doc) return Promise.reject({ status: 400, error: `user with email: ${email} not found` });

	return doc._id;
}

export async function checkEmailExistAndNotId(email: string, _id: ObjectId = undefined) {
	const doc = await db.collection('users').findOne({ email });

	if (doc && doc._id.toString() !== _id.toString()) {
		return Promise.reject({ status: 400, error: 'email address already defined' });
	}

	return true;
}

export async function createUser(newUser: User) {
	if (!newUser || !newUser.email || !newUser.username) {
		return Promise.reject({ status: 400, error: 'new user undefined' });
	}

	newUser.password = 'none';

	const date = new Date();
	newUser.creationDate = date.toISOString();
	newUser.personalKey = generatePersonalKey();

	const response = await db.collection('users').insertOne({ ...newUser });
	// askPasswordCreation(newUser.email);
	return await db.collection('users').findOne({ _id: response.insertedId });
}

export async function revokeUserToken(_id: ObjectId) {
	const personalKey = generatePersonalKey();
	return await db.collection('users').updateOne({ _id }, { $set: { personalKey } });
}
