import { ObjectId } from 'mongodb';
import type { User } from '../database.js';
import {
    getUserDataById,
    updateUserById,
    updateUserFollowedCryptosById
} from './user.js';
import { getCryptoByUUID } from '../crypto/cryptoCurrencies.js';

// const collection = 'users';

export async function getAllFollowedCryptosFromUserId(_id: ObjectId) {
    const user: User = await getUserDataById(_id);
    if (!user) {
        return Promise.reject({
            status: 404,
            error: `user with id ${_id} not found.`
        });
    }
    if (!user.followedCryptos) {
        user.followedCryptos = [];
        await updateUserById(user._id, user);
    }
    return user.followedCryptos;
}

export async function isFollowingCrypto(_id: ObjectId, uuid: string) {
    await getCryptoByUUID(uuid); //Just to check if it exists

    const followed = await getAllFollowedCryptosFromUserId(_id);

    if (!followed) {
        return false;
    }
    const found: boolean = followed.find(value => {
        if (value == uuid) {
            return true;
        }
        return false;
    })
        ? true
        : false;
    return found;
}

export async function addFollowedCrypto(_id: ObjectId, uuid: string) {
    let user: User = await getUserDataById(_id);

    let followedCryptos: string[] = user.followedCryptos;

    if (followedCryptos.indexOf(uuid) == -1) {
        followedCryptos.push(uuid);
        if (await updateUserFollowedCryptosById(_id, followedCryptos)) {
            return true;
        }
    }
    return false;
}

export async function deleteFollowedCrypto(_id: ObjectId, uuid: string) {
    let user: User = await getUserDataById(_id);

    let followedCryptos: string[] = user.followedCryptos;

    if (followedCryptos.indexOf(uuid) != -1) {
        followedCryptos.splice(followedCryptos.indexOf(uuid), 1);
        if (await updateUserFollowedCryptosById(_id, followedCryptos)) {
            return true;
        }
    }
    return false;
}

export async function toggleFollowedCrypto(_id: ObjectId, uuid: string) {
    let res = {};
    if (await isFollowingCrypto(_id, uuid)) {
        const state = await deleteFollowedCrypto(_id, uuid);
        res = { state: state, followed: false };
    } else {
        const state = await addFollowedCrypto(_id, uuid);
        res = { state: state, followed: true };
    }
    return res;
}
