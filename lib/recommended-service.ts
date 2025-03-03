import { db } from "./db"
import { getSelf } from "./auth-service"

export const getRecommended = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    let users = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                        id: userId
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blockedBy: {
                                some: {
                                    blockerId: userId
                                }
                            }
                        }
                    },
                    {
                        stream: {
                            isLive: true
                        }
                    }
                ],
            },
            include: {
                stream: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } else {
        users = await db.user.findMany({
            where: {
                stream: {
                    isLive: true
                }
            },
            include: {
                stream: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }
    return users
}