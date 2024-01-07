import { ObjectId } from "mongodb";
import type { CryptoCurrency } from "../database.js";

import { db } from '../init.js';

const collection: string = 'cryptos';

export async function getAllCryptosData() {
    return await db.collection(collection).find<CryptoCurrency>({}).toArray();
}

export async function getCryptoById(_id: ObjectId) {
	const doc = await db.collection(collection).findOne<CryptoCurrency>({ _id });

	return doc ? doc : Promise.reject({ status: 404, error: 'cryptocurrency not found' });
}

export async function getCryptoByName(name: string) {
    const doc = await db.collection(collection).findOne<CryptoCurrency>({ name });

	if (!doc) return Promise.reject({ status: 400, error: `cryptocurrency with name: ${name} not found` });
    
    return doc;
}

export async function getCryptoByUUID(uuid: string) {
    const doc = await db.collection(collection).findOne<CryptoCurrency>({ uuid });

	if (!doc) return Promise.reject({ status: 400, error: `cryptocurrency with uuid: ${uuid} not found` });
    
    return doc;
}

export async function getCryptoBySymbol(symbol: string) {
    const doc = await db.collection(collection).findOne<CryptoCurrency>({ symbol });

	if (!doc) return Promise.reject({ status: 400, error: `cryptocurrency with symbol: ${symbol} not found` });
    
    return doc;
}

export async function createCrypto(newCrypto: CryptoCurrency) {
    if (!newCrypto || !newCrypto.name || !newCrypto.symbol) {
		return Promise.reject({ status: 400, error: 'new crypto undefined' });
    }

    const cryptoAlreadyExists = await getCryptoByName(newCrypto.name)
    .then( () => {
        return true;
    })
    .catch( () => {
        return false;
    }
    );
    if (cryptoAlreadyExists) {
        return Promise.reject({ status: 409, error: `crypto ${newCrypto.name} already exists.`});
    }

    const response = await db.collection(collection).insertOne({ ...newCrypto });
    return await db.collection(collection).findOne({ _id: response.insertedId });
}

export async function updateCryptoByUUID(uuid: string, crypto: Partial<CryptoCurrency>) {
    if (!uuid || uuid.length == 0) return Promise.reject({ status: 404, error: 'crypto not found' });
    if (!crypto) return Promise.reject({ status: 400, error: 'missing new crypto data'});

    const doc = await db.collection(collection)
        .findOneAndUpdate({uuid}, {$set: {...crypto}}, { returnDocument: 'after' });
    
    return doc ? (doc as CryptoCurrency) : Promise.reject({ status: 404, error: 'crypto not found'});
}
