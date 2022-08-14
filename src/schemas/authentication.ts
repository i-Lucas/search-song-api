import joi from "joi";
import { users } from "@prisma/client";

type CreateUserData = Omit<users, "id" | "createdAt">;
type SigninUser = Omit<CreateUserData, "name">;

const signup = joi.object<CreateUserData>({

	name: joi.string().min(3).max(15).required(),
	email: joi.string().email().required(),
	password: joi.string().min(5).required(),
});

const signin = joi.object<SigninUser>({
	
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const auth = { signup, signin };
export default auth;