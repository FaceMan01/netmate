"use client"

import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./message"

interface ChatListProps {
    messages: ReceivedChatMessage[]
    viewerName: string
    hostName: string
}

export const ChatList = ({
    messages,
    viewerName,
    hostName
}: ChatListProps) => {
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {messages.map((message) => (
                <ChatMessage 
                    data={message}
                    viewerName={viewerName}
                    hostName={hostName}
                />
            ))}
        </div>
    )
} 