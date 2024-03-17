"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Вы подписались на ${data.following.username}`))
                .catch(() => toast.error("Error"))
        })
    }
    
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Вы отписались от ${data.following.username}`))
                .catch(() => toast.error("Error"))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    return (
        <div>
            <Button disabled={isPending} onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        </div>
    )
}