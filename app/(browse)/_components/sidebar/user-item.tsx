"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface UserItemProps {
    username: string
    imageUrl: string
    isLive?: boolean
}

export const UserItem = ({
    username,
    imageUrl,
    isLive
}: UserItemProps) => {
    const pathname = usePathname()
    
    const href = `/${username}`
    const isActive = pathname === href

    return (
        <Button 
            asChild
            variant="ghost"
            className={cn(
                "w-full h-12", 
                isActive && "bg-accent"

            )}
        >
            <Link href={href}>
                <div className="flex item-center w-full gap-x-4">
                    <UserAvatar 
                        imageUrl={imageUrl}
                        username={username}
                        isLive={isLive}
                    />
                </div>
            </Link>
        </Button>
    )
} 