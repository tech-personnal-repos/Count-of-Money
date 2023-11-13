import Logger from '../config/logger.js';
import type { LoggedRequest, NextFunction, Request, Response } from '../routes/express.js';

interface ApiError extends Error {
	status: number;
	message: string;
	error?: string;
}

function handleError(e: ApiError, res: Response) {
	const status = e.status || 500;
	const error = e.error || `${e.name}: ${e.message}`;

	if (res.headersSent) return Logger.error(`error: header already sent (${status} - ${JSON.stringify(error)})`);

	Logger.error(`error: request: ${status}: ${JSON.stringify(error)}`);
	res.status(status).send(status === 500 ? null : error);
}

export function wrap(route: { (req: Request | LoggedRequest, res: Response, next: NextFunction): Promise<any> }) {
	return (req: Request | LoggedRequest, res: Response, next: NextFunction) => {
		try {
			const promise = route(req, res, next);

			if (promise && promise.then) promise.then(next).catch(e => handleError(e, res));
			else next();
		} catch (e) {
			handleError(e, res);
		}
	};
}
