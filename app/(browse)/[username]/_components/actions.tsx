"use client"

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { isBlockedUser } from "@/lib/block-service"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isBlocked: boolean
    isFollowing: boolean
    userId: string
}

export const Actions = ({
    isBlocked,
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            if (isBlocked) {
                onUnblock(userId)
                    .catch(() => toast.error("Что-то пошло не так"))
            }
            onFollow(userId)
                .then((data) => toast.success(`Вы подписались на ${data.following.username}`))
                .catch(() => toast.error("Cannot follow"))
        })
    }
    
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Вы отписались от ${data.following.username}`))
                .catch(() => toast.error("Cannot unfollow"))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            if (isFollowing) {
                onUnfollow(userId)
                    .catch(() => toast.error("Что-то пошло не так"))
            }
            onBlock(userId)
                .then((data) => toast.success(`Вы заблокировали ${data.blocked.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`Вы разблокировали ${data.blocked.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }

    return (
        <div>
            <Button disabled={isPending} onClick={onClick}>
                {isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
            <Button disabled={isPending} onClick={handleBlock}>
                Block
            </Button>
            <Button disabled={isPending} onClick={handleUnblock}>
                Unblock
            </Button>
        </div>
    )
}