import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

import { buttonVariants } from "./ui/Button"
import SignInButton from "./ui/SignInButton"
import SignOutButton from "./ui/SignOutButton"
import ThemeToggle from "./ThemeToggle"

const Navbar = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75">
            <div className="container mx-auto flex w-full max-w-7xl items-center justify-between">
                <Link href="/" className={buttonVariants({ variant: "link" })}>
                    Text Similarity v1.0
                </Link>

                <div className="md:hidden">
                    <ThemeToggle />
                </div>

                <div className="hidden gap-4 md:flex">
                    <ThemeToggle />
                    <Link
                        href="/documentation"
                        className={buttonVariants({ variant: "ghost" })}
                    >
                        Documentation
                    </Link>
                    {session ? (
                        <>
                            <Link
                                className={buttonVariants({ variant: "ghost" })}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
