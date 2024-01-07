import { scheduleJob, gracefulShutdown } from 'node-schedule';
import { refreshCoinList } from './jobs/refreshCoinList.js';

export async function start() {
    // scheduleJob('30 8 * * *'); // every day at 8:30am
    // scheduleJob('*/30 * * * * *'); // every 30 seconds
    // scheduleJob('*/10 * * * * *'); // every 10 seconds
    // scheduleJob('45 8 * * *'); // every day at 8:45am
    // scheduleJob('*/2 * * * *'); // every 2 minutes
    // scheduleJob('0 */1 * * *'); // every 1 hour
    // scheduleJob('0 0 2 * *'); // every 2nd day of the month
    // scheduleJob('0 0 * * 1'); // every monday
    // scheduleJob('0 0 1 1 *'); // Every 1st January

    scheduleJob('*/1 * * * *', refreshCoinList());
}

// setTimeout(async () => {
//     refreshCoinList();
// }, 500);

export async function stop() {
    return await gracefulShutdown();
}
