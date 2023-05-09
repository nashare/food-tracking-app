import * as userAPI from './users-api';

export async function signUp(userData) {
    const token = await userAPI.signUp(userData);
    // TODO: more user service related tasks to handled here later
    return token;
}