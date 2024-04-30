"use client"

import { useTracks } from "@livekit/components-react"
import { Participant, Track } from "livekit-client"
import { useRef } from "react"

interface LiveVideoProps {
    participant: Participant
}

export const LiveVideo = ({
    participant
}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current)
                track.publication.track?.attach(videoRef.current)
        })

    return (
        <div className="flex relative h-full">
            <video controls ref={videoRef} width="100%" />
        </div>
    )
} 