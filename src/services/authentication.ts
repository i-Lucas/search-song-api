import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SignupUser, SigninUser } from '../types/types.js';

import users from './users.js';
import error from '../utils/error.js';

async function signup(data: SignupUser) {

	data.email = data.email.toLowerCase();
	const { email, password } = data;

	const user = await users.findByEmail(email);
	if (user) error.Conflict('Email already in use');

	data.password = await bcrypt.hash(password, 10);
	await users.create(data);
};

async function signin(data: SigninUser) {

	const { email, password } = data;
	const user = await users.findByEmail(email);

	if (!user) error.NotFound('User not found');
	if (!(await bcrypt.compare(password, user.password))) error.Unauthorized('Invalid password');

	const expiresIn = 60 * 60; // 1 hour
	const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn });
	return token;
};

const authServices = { signup, signin };
export default authServices;