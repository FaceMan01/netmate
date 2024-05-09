"use client"

import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./message"

interface ChatListProps {
    messages: ReceivedChatMessage[]
    isHidden: boolean
}

export const ChatList = ({
    messages,
    isHidden
}: ChatListProps) => {
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {messages.map((message) => (
                <ChatMessage 
                    data={message}
                />
            ))}
        </div>
    )
} 