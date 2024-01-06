/* ***********************************


			REQUIRES MODULES


*********************************** */

import { config } from 'dotenv';

config();

import { close, connect } from './models/database/init.js';
import { setup } from './config/server.js';
import { initRoutes } from './routes/routes.js';

import Logger from './config/logger.js';

export const handler = async (event: any, context: any) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connect();

    const app = await initRoutes(setup());
    const port = process.env.SERVER_PORT || 3000;

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

async function start() {
    const isProduction =
        process.env.NODE_ENV === 'production' &&
        !['dev', 'stage'].includes(process.env.DB_NAME);
    Logger.info(
        `Starting API in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`
    );

    const http = await import('http');

    await connect();
    const app = await initRoutes(setup());

    const server = http.createServer(app);
    server.listen(process.env.SERVER_PORT || 3000, () => {
        const address: any = server.address();
        Logger.info(`Server launched on ${address.address}${address.port}`);
    });

    process.on('SIGTERM', async () => {
        server.close(async () => {
            await close();
            process.exit(0);
        });
    });

    process.on('SIGINT', async () => {
        server.close(async () => {
            await close();
            process.exit(0);
        });
    });

    process.on('unhandledRejection', (reason, _) => {
        Logger.error(`Unhandled Rejection: ${reason}`);
    });

    return server;
}

if (process.env.SERVERLESS === 'false') start();
