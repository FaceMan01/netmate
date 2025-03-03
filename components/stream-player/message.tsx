"use client"

import { ReceivedChatMessage } from "@livekit/components-react"
import Link from "next/link"

interface ChatMessageProps {
    data: ReceivedChatMessage
}

export const ChatMessage = ({
    data
}: ChatMessageProps) => {
    return (
        <div className="flex gap-2 p-2">
            <div className="flex flex-wrap gap-1">
                <p className="font-semibold whitespace-nowrap hover:underline">
                    <Link href={`/${data.from?.name}`} onClick={() => console.log(data.from?.name)} className="truncate" style={{color: "skyblue"}}>
                        {data.from?.name}
                    </Link>:
                </p>
                <p className="break-all">
                    {data.message}
                </p>
            </div>
        </div>  
    )
} 