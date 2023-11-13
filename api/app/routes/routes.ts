import type { Express } from 'express';
import Logger from '../config/logger.js';

async function importRoutes() {
	const modules = await Promise.all([
		import('./auth/init.js'),
		import('./root/init.js'),
	]);

	return modules.map(e => e.default);
}
export async function initRoutes(app: Express) {
	const timer = Date.now();

	const [
		auth,
		root,
	] = await importRoutes();

	app.use('/', root);

	app.use('/auth', auth);

	Logger.info(`Initialize endpoints... ${Date.now() - timer}ms`);

	return app;
}
