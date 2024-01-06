import type { ObjectId } from 'mongodb';

export interface Projection {
    [key: string]: 0 | 1;
}

export interface User {
    _id?: ObjectId;
    email: string | null;
    password: string;
    username: string;
    displayName?: string;
    roles?: string[];
    personalKey?: string;
    followedCryptos?: string[];
    avatarUrl?: string;
    githubId?: string;
    googleId?: string;
}

export interface CryptoCurrency {
    _id?: ObjectId;
    uuid: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    marketCap: number;
    iconUrl: string;
}
