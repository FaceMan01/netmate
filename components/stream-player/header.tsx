"use client"

import { UserAvatar } from "@/components/user-avatar"
import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { Actions } from "./actions"

interface HeaderProps {
    hostName: string
    hostId: string
    viewerId: string
    imageUrl: string
    name: string
    isFollowing: boolean
    followedByCount: number
    isBlocked: boolean
}

export const Header = ({
    hostName,
    hostId,
    viewerId,
    imageUrl,
    name,
    isFollowing,
    followedByCount,
    isBlocked
}: HeaderProps) => {
    const praticipants = useParticipants()
    const praticipant = useRemoteParticipant(hostId)

    const isLive = !!praticipant
    const praticipantsCount = praticipants.length - 1

    const hostAsViewer = `host-${hostId}`
    const isHost = viewerId === hostAsViewer

    return (
        <div>
            <div className="text-xl px-4 pb-4 font-semibold">
                <p>
                    {name}
                </p>
            </div>
            <div className="flex flex-row item-start justify-between gap-y-0 px-4">
                <div className="flex item-center gap-x-3">
                    <UserAvatar
                        imageUrl={imageUrl}
                        username={hostName}
                        size="lg"
                        isLive={isLive}
                    />
                    <div className="space-y-1 item-center">
                        <div className="gap-x-2">
                            <h2 className="text-lg font-semibold">
                                {hostName}
                            </h2>
                        </div>
                        <div className="felx text-sm text-muted-foreground">
                            <span className="text-primary">
                                {followedByCount}
                            </span> {followedByCount === 1 ? "подписчик" : "подписчиков"}
                        </div>
                        {isLive ? (
                            <div className="font-semibold flex gap-x-1 items-center text-sm text-red-500">
                                <p>
                                    {praticipantsCount} {praticipantsCount === 1 ? "зритель" : "зрителей"}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm">
                                Не в сети
                            </p>
                        )}
                    </div>
                </div>
                <Actions
                    isFollowing={isFollowing}
                    isBlocked={isBlocked}
                    hostId={hostId}
                    isHost={isHost}
                />
            </div>
        </div>
    )
} 