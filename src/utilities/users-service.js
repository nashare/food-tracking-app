import * as userAPI from './users-api';

export async function signUp(userData) {
    const token = await userAPI.signUp(userData);
    localStorage.setItem('token', token);
    return token;
};