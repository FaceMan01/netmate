import { isFollowingUser } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Actions } from "./_components/actions"
import { isBlockedUser } from "@/lib/block-service"

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

    return (
        <div className="flex flex-col gap-y-4 ">
            <p>Username: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>User: {user.imageUrl}</p>
            <p>Is Following: {`${isFollowing}`}</p>
            <p>Is Bloked: {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked}/>
        </div>
    )
} 

export default UserPage;