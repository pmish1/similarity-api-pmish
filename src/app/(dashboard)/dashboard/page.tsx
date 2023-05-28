import { FC } from "react"

import ApiDashboard from "@/components/ApiDashboard"
import RequestApiKey from "@/components/RequestApiKey"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
    title: "Similarity API | Dashboard",
    description: "Free and open-source text smilarity API",
}

const page = async () => {
    const user = await getServerSession(authOptions)
    if (!user) return notFound()

    const apiKey = await db.apiKey.findFirst({
        where: { userId: user.user.id, enabled: true },
    })
    return (
        <div className="mx-auto mt-16 max-w-7xl">
            {apiKey ? (
                // @ts-expect-error Server component
                <ApiDashboard />
            ) : (
                <RequestApiKey />
            )}
        </div>
    )
}

export default page
