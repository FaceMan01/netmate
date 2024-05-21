"use client"

import { UserAvatar } from "@/components/user-avatar"
import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { UserIcon } from "lucide-react"
import { Actions } from "./actions"

interface HeaderProps {
    hostName: string
    hostId: string
    viewerId: string
    imageUrl: string
    name: string
    isFollowing: boolean
}

export const Header = ({
    hostName,
    hostId,
    viewerId,
    imageUrl,
    name,
    isFollowing
}: HeaderProps) => {
    const praticipants = useParticipants()
    const praticipant = useRemoteParticipant(hostId)

    const isLive = !!praticipant
    const praticipantsCount = praticipants.length - 1

    const hostAsViewer = `host-${hostId}`;
    const isHost = viewerId === hostAsViewer;

    return (
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
                    <p>
                        {name}
                    </p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-sm text-red-500">
                            <UserIcon className=""/>
                            <p>
                                {praticipantsCount} {praticipantsCount === 1 ? "viewer" : "viewers"}
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
                    hostId={hostId}
                    isHost={isHost}
                />
        </div>
    )
} 