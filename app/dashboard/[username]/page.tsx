import { StreamPlayer } from "@/components/stream-player"
import { getUserByUsername } from "@/lib/user-service"
import { currentUser } from "@clerk/nextjs"

interface CreatorPageProps {
    params: {
        username: string
    }
}

const CreatorPage = async ({
    params
}: CreatorPageProps) => {
    const externalUser = await currentUser()
    const user = await getUserByUsername(params.username)

    if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
        throw new Error("Unauthorized")
    }

    return (
        <div className="felx h-fill">
            <StreamPlayer
                user={user}
                stream={user.stream}
            />
        </div>
    )
} 

export default CreatorPage;