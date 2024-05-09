"use client"

import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useEffect, useMemo, useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatForm } from "./chat-form"
import { ChatList } from "./chat-list"

interface ChatProps {
    viewerName: string
    hostName: string
    hostId: string
    isFollowing: boolean
    isChatEnabled: boolean
}

export const Chat = ({
    viewerName,
    hostName,
    hostId,
    isFollowing,
    isChatEnabled
}: ChatProps) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostId)

    const isOnline = participant && connectionState === ConnectionState.Connected
    const isDisabled = !isChatEnabled || !isOnline

    const [value, setValue] = useState("")
    const {chatMessages, send} = useChat()

    const reversedMessage = useMemo(() => {
        return chatMessages.sort((a, b) => b.timestamp - a.timestamp)
    }, [chatMessages])
    const onSubmit = () => {
        if (!send) return

        send(value)
        setValue("")
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="flex flex-col bg-background h-[calc(100vh-80px)]"> 
            <ChatHeader />
            <ChatList
                messages={reversedMessage}
                isHidden={isDisabled}
            />
            <ChatForm
                onSubmit={onSubmit}
                value={value}
                onChange={onChange}
                isDisabled={isDisabled}
                isFollowing={isFollowing}
            />
        </div>
    )
} 