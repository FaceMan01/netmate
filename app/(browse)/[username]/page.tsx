import { isFollowingUser } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { isBlockedByUser, isBlockedUser } from "@/lib/block-service"
import { StreamPlayer } from "@/components/stream-player"

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if (!user) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedUser(user.id)
    const isBlockedBy = await isBlockedByUser(user.id)
    
    if (isBlockedBy) {
        notFound()
    }

    return (
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing={isFollowing}
                isBlocked={isBlocked}
            />
    )
} 

export default UserPage;