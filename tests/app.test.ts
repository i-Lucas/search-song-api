import supertest from 'supertest';

import app from '../src/app.js';
import prisma from '../src/config/db.js';
import userFactory from './factories/user.js';
//import tokenFactory from './factories/tokenFactory.js';

beforeAll(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

describe('signup tests', () => {

	const duplicated = userFactory.signupGenerate();

	it('signup valid -> status 201', async () => {
		const response = await supertest(app).post('/signup')
			.send(duplicated);
		expect(response.status).toEqual(201);
	});

	it('duplicate signup -> status 409', async () => {

		const response = await supertest(app).post('/signup')
			.send(duplicated);
		expect(response.status).toEqual(409);
	});

	it('invalid signup password -> status 422', async () => {

		const login = userFactory.signupGenerate();
		delete login.password;
		const response = await supertest(app).post('/signup').send(login);
		expect(response.status).toEqual(422);
	});

	it('invalid signup email -> status 422', async () => {

		const login = userFactory.signupGenerate();
		delete login.email;
		const response = await supertest(app).post('/signup').send(login);
		expect(response.status).toEqual(422);
	});
});

describe('signin tests', () => {

	it('valid signin -> return token', async () => {

		const newUser = userFactory.signupGenerate();
		const userCreated = await userFactory.createUser(newUser);
		const login = await userFactory.signinGenerate(userCreated);

		const response = await supertest(app).post('/signin')
			.send(login);

		const token = response.text;
		expect(token).not.toBeNull();
	});

	it('wrong password -> status 401', async () => {

		const newUser = userFactory.signupGenerate();
		const userCreated = await userFactory.createUser(newUser);
		const login = await userFactory.signinGenerate(userCreated);

		const response = await supertest(app).post('/signin')
			.send({ ...login, password: 'badpassword' });
		expect(response.status).toEqual(401);
	});

	it('invalid email -> status 422', async () => {

		const response = await supertest(app).post('/signin')
			.send({ email: 'invalidemail', password: 'badbad' });
		expect(response.status).toEqual(422);
	});

	it('user not found -> status 404', async () => {

		const response = await supertest(app).post('/signin')
			.send({ email: 'notfoundthis@test.com', password: 'badbad' });
		expect(response.status).toEqual(404);
	});
});

afterAll(async () => {

	//await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
	await prisma.$disconnect();
});