import type { ObjectId } from 'mongodb';

export interface Projection {
    [key: string]: 0 | 1;
}

export interface User {
    _id?: ObjectId;
    email: string;
    password: string;
    username: string;
    creationDate?: string;
    roles?: string[];
    personalKey?: string;
}

export interface CryptoCurrency {
    _id?: ObjectId;
    uuid: string;
    name: string;
    symbol: string;
    price: number;
    iconUrl: string;
    highestPrice: number;
    highestPriceTimestamp: string;
    supplyCirculating: number;
    supplyTotal: number;
}
