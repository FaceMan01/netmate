"use client"

import { useViewerToken } from "@/hooks/viewer-token"
import { LiveKitRoom, VideoTrack } from "@livekit/components-react"
import { Stream, User } from "@prisma/client"
import { Video } from "./video"
import { Chat } from "./chat"

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
                className="grid grid-cols-4"
            >
                <div className="space-y-4 col-span-3 ">
                    <Video 
                        hostName={user.username}
                        hostId={user.id}
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