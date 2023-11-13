import { Db, MongoClient } from 'mongodb';

import Logger from '../../config/logger.js';

export let db: Db;
export let client: MongoClient | undefined;

export async function connect(): Promise<Db> {
	if (db) {
		Logger.info('Already connected to the database');
		return db;
	}

	const timer = Date.now();

	try {
		if (!process.env.DB_URI) throw 'database uri is not defined';

		client = await MongoClient.connect(process.env.DB_URI);

		const dbList = await client.db().admin().listDatabases();
		if (!dbList.databases.some(db => db.name === process.env.DB_NAME)) {
			throw `database ${process.env.DB_NAME} does not exist`;
		}

		db = client.db(process.env.DB_NAME);
	} catch (e) {
		Logger.error(`db: failed to connect: ${e}`);
		process.exit(1);
	}

	const execTime = Date.now() - timer;
	Logger.info(`Connecting to database... ${execTime}ms`);
	return db;
}

export async function close() {
	if (!client) return;
	return await client.close();
}

export async function generateFromMemory(MemoryDump: Record<string, any>) {
	if (db) return db;

	const { MongoMemoryServer } = await import('mongodb-memory-server');

	const mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	try {
		client = await MongoClient.connect(mongoUri);
		db = client.db('test');
	} catch (e) {
		Logger.error(`db: failed to connect: ${e}`);
		process.exit(1);
	}

	await Promise.all(
		Object.entries(MemoryDump).map(([collection, data]: [string, any[]]) => {
			if (!data || data.length === 0) return;
			return db.collection(collection).insertMany(data);
		})
	);

	return db;
}
