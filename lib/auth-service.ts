import { currentUser } from "@clerk/nextjs"
import { db } from "./db"

export const getSelf = async () => {
    const self  = await currentUser()

    if (!self || !self.username) {
        throw new Error("Неавторизован")
    }

    const user = await db.user.findUnique({
        where: {externalUserId: self.id}
    })

    if (!user) {
        throw new Error("Пользователь не найден")
    }

    return user
} 

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser()

    if (!self || !self.username) {
        throw new Error("Неавторизован")
    }

    const user = await db.user.findUnique({
        where: {username}
    })

    if (!user) {
        throw new Error("Пользователь не найден")
    }

    if (self.username !== username) {
        throw new Error("Доступ запрещен")
    }

    return self
}