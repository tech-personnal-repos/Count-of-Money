import { ObjectId } from 'mongodb';

import {
    checkEmailExist,
    checkEmailExistAndNotId,
    createUser
} from '../../models/database/auth/user.js';
import {
    deleteUserById,
    getUserDataById,
    updateUserById
} from '../../models/database/user/user.js';

import type { CreateUserRequest } from '../../schemas/user/userCreate.js';
import type { UpdateUserRequest } from '../../schemas/user/userUpdate.js';
import { generatePersonalKey } from '../../models/database/auth/token.js';
// import { User } from '../../models/database/database.js';

async function checkIfEmailAlreadyExist(email: string) {
    return await checkEmailExist(email);
}

export async function checkIfEmailAlreadyExistAndNotId(
    email: string,
    _id: ObjectId
) {
    return await checkEmailExistAndNotId(email, _id);
}

export async function createNewUser(
    body: CreateUserRequest,
    groupId: ObjectId
) {
    await checkIfEmailAlreadyExist(body.email);
    return await createUser({ ...body, password: '' });
}

export async function updateUser(id: string, body: UpdateUserRequest) {
    const _id = new ObjectId(id);

    if ('email' in body)
        await checkIfEmailAlreadyExistAndNotId(body.email, _id);

    delete body.password;
    delete body.email;
    const user = await getUserDataById(_id);

    let revokeToken = false;
    if (body.email && user.email !== body.email) revokeToken = true;
    else if (body.username && user.username !== body.username)
        revokeToken = true;

    if (revokeToken) user.personalKey = generatePersonalKey();

    const updatedUser = { ...user, ...body };
    const res = await updateUserById(_id, updatedUser);
    return res;
}

export async function deleteUser(id: string) {
    const _id = new ObjectId(id);

    const { roles } = await getUserDataById(_id);
    if (roles.includes('admin'))
        return Promise.reject({ status: 423, error: 'user is an admin' });

    return await deleteUserById(_id);
}
