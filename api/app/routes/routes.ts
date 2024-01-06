import type { Express } from 'express';
import Logger from '../config/logger.js';

async function importRoutes() {
    const modules = await Promise.all([
        import('./root/init.js'),
        import('./register/init.js'),
        import('./cryptos/init.js'),
        import('./users/init.js')
    ]);

    return modules.map(e => e.default);
}
export async function initRoutes(app: Express) {
    const timer = Date.now();

    const [root, register, cryptos, users] = await importRoutes();

    app.use('/', root);

    app.use('/register', register);

    app.use('/cryptos', cryptos);

    app.use('/users', users);

    Logger.info(`Initialize endpoints... ${Date.now() - timer}ms`);

    return app;
}
