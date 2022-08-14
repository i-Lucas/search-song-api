import prisma from "../src/config/db.js";
import bcrypt from "bcrypt";
import time from "../src/utils/time.js";

async function main() {

	const users = [
		{
			id: 0,
			name: "Lucas Emmanuel",
			email: "lucas@admin.com",
			password: await bcrypt.hash("123456", 10),
			createdAt: time.formated(),
		}
	]

	await prisma.users.createMany({ data: users });
}

main().catch((e) => {

	console.log(e);
	process.exit(1);

}).finally(async () => await prisma.$disconnect());