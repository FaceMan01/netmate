"use client"

import { Follow, Stream, User } from "@prisma/client"
import { UserItem } from "./user-item"

interface FollowingProps {
    data: (Follow & {following: User & {stream: Stream}})[]    
}

export const Following = ({
    data
}: FollowingProps) => {
    if (!data.length) {
        return null
    }

    return (
        <div>
        <div className="pl-6 mb-4">
            <p className="text-muted-foreground">
                Отслеживаемые каналы
            </p>
        </div>
        <ul className="space-y-2 px-2">
            {data.map((follow) => (
                <UserItem 
                    key={follow.id}
                    username={follow.following.username}
                    imageUrl={follow.following.imageUrl}
                    isLive={follow.following.stream?.isLive}
                />
            ))}
        </ul>
    </div>
    )
} 