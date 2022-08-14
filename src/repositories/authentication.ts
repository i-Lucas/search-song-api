import prisma from "../config/db.js";
import { SignupUser } from "../types/types.js";

export interface UserTokenInfo { email: string; id: number; }

async function findEmail(email: string) {
	return await prisma.users.findUnique({ where: { email } });
};

async function findId(id: number) {
	return await prisma.users.findUnique({ where: { id } });
};

async function save(data: SignupUser) {
	await prisma.users.create({ data });
};

const user = { save, findEmail, findId };
export default user;