"use client"

import { ConnectionState, Track } from "livekit-client"
import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react"
import { OfflineVideo } from "./offline"
import { Loading } from "./loading"
import { LiveVideo } from "./live-video"

interface VideoProps {
    hostName: string
    hostId: string
}

export const Video = ({
    hostName,
    hostId
}: VideoProps) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostId)
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone 
    ])

    let content 

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo hostName={hostName}/>
    } else if (!participant || tracks.length === 0) {
        content = <Loading/>
    } else {
        content = <LiveVideo participant={participant}/>
    }

    return (
        <div className="aspect-video border-b group relative">
            {content} 
        </div>
    )
} 