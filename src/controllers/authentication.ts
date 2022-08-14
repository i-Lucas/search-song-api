import { Request, Response } from 'express';

import { SignupUser, SigninUser } from '../types/types.js';
import auth from '../services/authentication.js';
import time from '../utils/time.js';

async function signup(req: Request, res: Response) {

	const body: {
		name: string,
		email: string;
		password: string;
	} = req.body;

	const data: SignupUser = {
		name: body.name,
		email: body.email,
		password: body.password,
		createdAt: time.formated()
	};

	await auth.signup(data);
	res.sendStatus(201);
};

async function signin(req: Request, res: Response) {

	const body: {
		email: string;
		password: string;
	} = req.body;

	const data: SigninUser = {
		email: body.email,
		password: body.password,
	};

	const token = await auth.signin(data);
	res.status(200).send(token);;
};

const authentication = { signup, signin };
export default authentication;