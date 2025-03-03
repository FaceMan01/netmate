import { db } from "./db"
import { getSelf } from "./auth-service"

export const getStreams = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    }
    catch {
        userId = null
    }

    let streams = []

    if (userId) {
        streams = await db.stream.findMany({
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ],
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }
            }
        })

    } else {
        streams = await db.stream.findMany({
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
    }

    return streams
}