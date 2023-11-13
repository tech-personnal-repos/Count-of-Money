import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import type { User } from '../database.js';

export function createUserToken(
	personalKey: User['personalKey'],
	id: string,
	email: User['email'],
	username: User['username'],
	roles: User['roles'],
): string {
	const completeKey = `${personalKey}${process.env.JWT_SECRET}`;
	return jwt.sign({ id, email, username, roles }, completeKey, { expiresIn: '1d' });
}

export function createUserRefreshToken(
	id: string,
	email: User['email'],
	username: User['username'],
	roles: User['roles'],
): string {
	return jwt.sign({ id, email, username, roles }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '1y'
	});
}

export function generatePasswordHash(password: string) {
	return crypto.createHmac('sha256', process.env.SECRET_HASH).update(password).digest('hex');
}

export function generatePersonalKey() {
	return crypto.randomBytes(24).toString('hex');
}
