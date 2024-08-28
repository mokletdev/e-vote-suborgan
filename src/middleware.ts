import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
	const { nextUrl, nextauth } = req;

	if (!nextauth) {
		return NextResponse.redirect(new URL("/login", nextUrl));
	}

	if (
		nextauth.token?.role !== "admin" &&
		nextUrl.pathname.startsWith("/admin")
	) {
		return NextResponse.rewrite(new URL("/accesdenied", req.url), {
			status: 403,
		});
	}

	if (
		nextauth.token?.role !== "student" &&
		(nextUrl.pathname.startsWith("/vote") ||
			nextUrl.pathname.startsWith("/aftervote"))
	) {
		return NextResponse.rewrite(new URL("/accesdenied", req.url), {
			status: 403,
		});
	}
});

export const config = {
	matcher: ["/vote/:path*", "/aftervote/:path*", "/admin/:path*"],
};
