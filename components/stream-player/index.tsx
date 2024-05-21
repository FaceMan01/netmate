"use client"

import { useViewerToken } from "@/hooks/viewer-token"
import { LiveKitRoom, VideoTrack } from "@livekit/components-react"
import { Stream, User } from "@prisma/client"
import { Video } from "./video"
import { Chat } from "./chat"
import { Header } from "./header"
import { InfoCard } from "./info-card"

interface StreamPlayerProps {
    user: User & {stream: Stream}
    stream: Stream
    isFollowing: boolean
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
    const { token, name, id } = useViewerToken(user.id)

    if (!token || !name || !id) {
        return (
            <p>
                Загрузка...
            </p>
        )
    }
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
                        hostName={user.username}
                        hostId={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
} 