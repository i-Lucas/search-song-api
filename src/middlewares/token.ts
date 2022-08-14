import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import error from '../utils/error.js';

export async function validate(req: Request, res: Response, next: NextFunction) {

	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '').trim();
	if (!token) error.Unauthorized('No token provided');

	const user = jwt.verify(token, process.env.SECRET_KEY);
	res.locals.user = user;

	next();
};