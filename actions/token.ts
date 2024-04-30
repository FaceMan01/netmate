"use server"

import { v4 } from "uuid"
import { getUserById } from "@/lib/user-service"
import { getSelf } from "@/lib/auth-service"
import { isBlockedUser } from "@/lib/block-service"
import { AccessToken } from "livekit-server-sdk"

export const createViewerToken = async (hostId: string) => {
    let self

    try {
        self = await getSelf()
    } catch {
        const id = v4()
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = {id, username}
    }

    const host = await getUserById(hostId)

    if (!host) {
        throw new Error("Пользователь не найден")
    }

    const isBlocked = await isBlockedUser(self.id)

    if (isBlocked) {
        throw new Error("Вы заблокированы")
    }

    const isHost = self.id === host.id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : `viewer-${self.id}`,
            name: self.username
        }
    )

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,    
        canPublishData: true,
    })

    return await Promise.resolve(token.toJwt())
}