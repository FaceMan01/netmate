"use client"

import { useViewerToken } from "@/hooks/viewer-token"
import { LiveKitRoom } from "@livekit/components-react"
import { Stream, User } from "@prisma/client"
import { Video } from "./video"
import { Chat } from "./chat"
import { Header } from "./header"
import { InfoCard } from "./info-card"
import { Loading } from "./loading"

interface StreamPlayerProps {
    user: User & {
        stream: Stream,
        _count: { followedBy: number }
    }
    stream: Stream
    isFollowing: boolean
    isBlocked: boolean
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
    isBlocked
}: StreamPlayerProps) => {
    const { token, name, id } = useViewerToken(user.id)

    if (!token || !name || !id) return
    
    return (
        <div>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className="grid grid-cols-5"
            >
                <div className="space-y-4 col-span-4 hidden-scrollbar pb-10">
                    <Video 
                        hostName={user.username}
                        hostId={user.id}
                    />
                    <Header
                        hostName={user.username}
                        hostId={user.id}
                        viewerId={id}
                        imageUrl={user.imageUrl}
                        name={stream.name}
                        isFollowing={isFollowing}
                        followedByCount={user._count.followedBy}
                        isBlocked={isBlocked}
                    />
                    <InfoCard
                        hostId={user.id}
                        viewerId={id}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />
                </div>
                <div>
                    <Chat
                        viewerName={name}
                        viewerId={id}
                        hostName={user.username}
                        hostId={user.id}
                        isChatEnabled={stream.isChatEnabled}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
} 