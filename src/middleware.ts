import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

//issue with Next.js 13 where importing variables from a .env file isn't working properly
//I understand having secret keys exposed is not secure, however, with the current version of
//Next.js, this is the only way I managed to get this to work.
const redis = new Redis({
    url: "https://suited-kit-36110.upstash.io",
    token: "AY0OASQgMjE5Y2Q1OGYtYjczMS00Y2JjLWEyZWUtYzZiYjg4NjFhNTM4ODdiNjA4NTRiODAzNDZlMGI0OGM2N2ZkNGI4YjRkZjQ=",
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
})

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname // relative path

        // Manage rate limiting
        if (pathname.startsWith("/api")) {
            const ip = req.ip ?? "127.0.0.1"
            try {
                const { success } = await ratelimit.limit(ip)

                if (!success)
                    return NextResponse.json({ error: "Too Many Requests" })
                return NextResponse.next()
            } catch (error) {
                return NextResponse.json({ error: "Internal Server Error" })
            }
        }

        // Manage route protection
        const token = await getToken({ req })
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith("/login")

        const sensitiveRoutes = ["/dashboard"]

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }

            return null
        }

        if (
            !isAuth &&
            sensitiveRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true
            },
        },
    }
)

export const config = {
    matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
}
