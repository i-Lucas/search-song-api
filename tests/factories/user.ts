import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import prisma from '../../src/config/db.js';
import time from '../../src/utils/time.js';

interface Signup {
	name: string,
	email: string;
	password: string,
};

interface Signin {
	email: string;
	password: string;
}

function signupGenerate() {
	const name = faker.name.findName();
	const email = faker.internet.email();
	const password = faker.internet.password(10);
	return { name, email, password };
};

async function createUser(login: Signup) {
	const user = await prisma.users.create({
		data: {
			name: login.name,
			email: login.email,
			password: bcrypt.hashSync(login.password, 12),
			createdAt: time.formated()
		},
	});

	return { ...user, password: login.password };
};

async function signinGenerate(login: Signin){
	return {email: login.email, password: login.password};
}

const userFactory = { signupGenerate, signinGenerate, createUser };
export default userFactory;