import { RateLimiterMongo } from 'rate-limiter-flexible';

import { client } from '../models/database/init.js';

import type { NextFunction, Request, Response } from '../routes/express.js';

const limiter = new RateLimiterMongo({
	storeClient: client,
	dbName: process.env.NODE_ENV === 'TEST' ? 'test' : process.env.DB_NAME,
	keyPrefix: 'request_limiter',
	points: 1, // 1 requests
	duration: 1 // per 1 second by IP
});

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
	limiter
		.consume(req.ip)
		.then(() => next())
		.catch(() => res.status(429).send('Too Many Requests'));
}
