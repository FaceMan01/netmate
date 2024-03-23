"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const Navigation = () => {
    const pathname = usePathname()
    const { user } = useUser()

    const routes = [
        {
            name: "Стрим",
            href: `/dashboard/${user?.username}`,
        },
        {
            name: "Ключ",
            href: `/dashboard/${user?.username}/keys`,
        },
        {
            name: "Чат",
            href: `/dashboard/${user?.username}/chat`,
        },
        {
            name: "Сообщество",
            href: `/dashboard/${user?.username}/community`,
        }
    ]
    return (
        <ul className="pt-2 space-y-2 px-2">
            {routes.map((route) => (
                <Button asChild variant="ghost" 
                className={cn(
                    "w-full h-12 justify-start bg-accent", 
                    pathname === route.href ? "bg-accent" : "bg-transparent"
                    )}
                >
            
                    <Link href={route.href}>
                        <div className="flex items-center gap-x-4">
                                <span className="text-base">
                                    {route.name}
                                </span>
                        </div>
                    </Link>
                </Button>
            ))}
        </ul>
    )
} 