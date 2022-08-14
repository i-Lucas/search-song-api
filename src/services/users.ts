import userRepo from '../repositories/authentication.js';
import { SignupUser } from '../types/types.js';

async function create(data: SignupUser) {
    return await userRepo.save(data);
};

async function findByEmail(email: string) {
    return await userRepo.findEmail(email);
};

async function findById(id: number) {
    return await userRepo.findId(id);
};

const user = { create, findByEmail, findById };
export default user;