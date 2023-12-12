import type { Express } from 'express';
import Logger from '../config/logger.js';

async function importRoutes() {
	const modules = await Promise.all([
		import('./auth/init.js'),
		import('./root/init.js'),
		import('./register/init.js')
	]);

	return modules.map(e => e.default);
}
export async function initRoutes(app: Express) {
	const timer = Date.now();

	const [
		auth,
		root,
		register
	] = await importRoutes();

	app.use('/', root);

	app.use('/auth', auth);

	app.use('/register', register)

	Logger.info(`Initialize endpoints... ${Date.now() - timer}ms`);

	return app;
}
