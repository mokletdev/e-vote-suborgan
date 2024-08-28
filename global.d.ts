import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient;

	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			CLOUDINARY_URL: string;
			NEXTAUTH_SECRET: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}
