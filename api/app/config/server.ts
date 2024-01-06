import express from 'express';

import cors from 'cors';
import helmet from 'helmet';

import Logger from './logger.js';
import logger from '../middleware/logger.js';

export function setup() {
	const timer = Date.now();
	const app = express();

	app.use(helmet());

	app.use(cors());
	app.use(express.json({ limit: '50mb' }));
	app.use(
		express.urlencoded({
			limit: '50mb',
			extended: true
		})
	);

	app.set('trust proxy', 1);

	app.use(logger);

	app.use(
		(
			error: express.ErrorRequestHandler,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			if (error instanceof SyntaxError) {
				res.status(400).send('error: not a json formatted body');
			} else next();
		}
	);

	Logger.info(`Setup express app... ${Date.now() - timer}ms`);

	return app;
}
