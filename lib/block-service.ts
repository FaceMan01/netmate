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


export const isBlockedByUser = async (id: string) => {
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
        
        const existingBlock = await db.block.findFirst({
            where: {
                blockedId: self.id,
                blockerId: otherUser.id
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
        throw new Error("Пользователь не найден")
    }

    if (otherUser.id === self.id) {
        throw new Error("Нельза заблокировать себя")
    }

    const existingBlock = await db.block.findFirst({
        where: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
    })

    if (existingBlock) {
        throw new Error("Уже заблокирован")
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
        throw new Error("Пользователь не найден")
    }

    if (otherUser.id === self.id) {
        throw new Error("Нельза разблокировать")
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

