import { ObjectId } from 'mongodb';
import type { User } from '../database.js';
import { getUserDataById, updateUserById } from './user.js';

// const collection = 'users';

export async function getAllFollowsFromUserId(_id: ObjectId) {
    const user: User = await getUserDataById(_id);
    if (!user) {
        return Promise.reject({ status: 404, error: `user with id ${_id} not found.`});
    }
    return user.followedCryptos;
}

export async function isFollowingCrypto(_id: ObjectId, uuid: string) {
    const followed = await getAllFollowsFromUserId(_id);

    if (!followed) {
        return false;
    }
    const found: boolean = followed.find((value) => {
        if (value == uuid) {
            console.log(`${value} == ${uuid}`);
            return true;
        }
        return false;
    }) ? true : false
    return found;
}

export async function addFollowedCrypto(_id: ObjectId, uuid: string) {
    let user: User = await getUserDataById(_id);

    let followedCryptos: string[] = user.followedCryptos;

    if (followedCryptos.indexOf(uuid) == -1) {
        followedCryptos.push(uuid);
        user.followedCryptos = followedCryptos;
        return await updateUserById(_id, user);
    }
    return false;
}

export async function deleteFollowedCrypto(_id: ObjectId, uuid: string) {
    let user: User = await getUserDataById(_id);

    let followedCryptos: string[] = user.followedCryptos;

    if (followedCryptos.indexOf(uuid) != -1) {
        followedCryptos.splice(followedCryptos.indexOf(uuid), 1);
        user.followedCryptos = followedCryptos;
        return await updateUserById(_id, user);
    }
    return false;
}

export async function toggleFollowedCrypto(_id: ObjectId, uuid: string) {
    if (await isFollowingCrypto(_id, uuid)) {
        // console.log(`Unfollowing ${uuid}`)
        return await deleteFollowedCrypto(_id, uuid);
    } else {
        // console.log(`Following ${uuid}`)
        return await addFollowedCrypto(_id, uuid);
    }
}