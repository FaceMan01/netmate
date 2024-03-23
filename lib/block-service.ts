import { db } from "./db"
import { getSelf } from "./auth-service"

export const isBlockedUser = async (id: string) => {
    try {
        const self = await getSelf()
        
        const otherUser = await db.user.findUnique({
            where: { id }
        }) 

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id) {
            return false
        }
        // NOTE: BlockedByUser & Unique
        const existingBlock = await db.block.findFirst({
            where: {
                blockedId: otherUser.id,
                blockerId: self.id
            },
        })

        return !!existingBlock
    } catch {
        return false
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id },
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot follow")
    }

    const existingBlock = await db.block.findFirst({
        where: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
    })

    if (existingBlock) {
        throw new Error("Already blocked")
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true
        }
    })

    return block
}


export const unblockUser = async (id: string) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id },
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot unblock")
    }

    const existingBlock = await db.block.findFirst({
        where: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
    })

    if (!existingBlock) {
        throw new Error("Not blocked")
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocked: true
        }
    })

    return unblock
}

