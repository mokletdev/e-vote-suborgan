import { type DefaultSession, AuthOptions, getServerSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserRole } from "@prisma/client";

import { createUser, findUser } from "@/utils/database/user.query";
import { compareHash } from "@/utils/encrypt";
import { stringify } from "querystring";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user?: {
			id: string;
			email: string;
			name: string;
			role: UserRole;
			angkatan: string | null;
			suborgan_id: string | null;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT extends DefaultJWT {
		id: string;
		email: string;
		name: string;
		role: UserRole;
		angkatan: string | null;
		suborgan_id: string | null;
	}
}

export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "user@student.smktelkom-mlg.sch.id",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "********",
				},
			},
			async authorize(credentials) {
				try {
					const user = await findUser({ email: credentials?.email });
					if (!user) return null;

					const comparePassword = await compareHash(
						credentials?.password!,
						user.password!
					);

					if (!comparePassword) return null;

					const payload = {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
					};
					return payload;
				} catch (e) {
					console.error(e);
					return null;
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			const redirectUrl = url.startsWith("/")
				? new URL(url, baseUrl).toString()
				: url;
			return redirectUrl;
		},

		async signIn({ user, profile, account }) {
			if (
				account?.provider == "google" &&
				!profile?.email?.endsWith("smktelkom-mlg.sch.id")
			)
				return false;

			if (user.email) {
				const userdb = await findUser({ email: user.email });
				if (!userdb) {
					const extractAngkatanFromEmail = (email: string): string | null => {
						const match = email.match(/_(\d+)[a-z]*@/);
						return match ? match[1] : null;
					};

					const angkatan = extractAngkatanFromEmail(user.email);
					await createUser({
						email: user.email,
						name: user.name || "",
						angkatan: angkatan ? angkatan : undefined,
						role: "student",
					});
				}
			}

			return true;
		},

		async jwt({ token, user }) {
			if (user?.email) {
				const userdb = await findUser({ email: user.email });
				if (!userdb) return token;
				token.id = userdb.id;
				token.email = userdb.email;
				token.name = userdb.name;
				token.role = userdb.role;
				token.angkatan = userdb.angkatan;
			}
			return token;
		},

		async session({ session, token }) {
			if (token.email && session.user) {
				const userdb = await findUser({ id: token.id as string });
				session.user.id = userdb?.id as string;
				session.user.role = userdb?.role as UserRole;
				session.user.name = userdb?.name as string;
				session.user.email = userdb?.email as string;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
};

export const nextGetServerSession = () => getServerSession(authOptions);
