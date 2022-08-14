import { users } from "@prisma/client";
import { musics } from "@prisma/client";

export type SignupUser = Omit<users, "id">;
export type SigninUser = Omit<SignupUser, "name" | "createdAt">;

export type SaveSearchedMusic = Omit<musics, "id">;