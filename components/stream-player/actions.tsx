import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { onFollow, onUnfollow } from "@/actions/follow" 
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"  
import { onBlock, onUnblock } from "@/actions/block"

interface ActionsProps {
    isFollowing: boolean
    isBlocked: boolean
    hostId: string
    isHost: boolean
}

export const Actions = ({
    isFollowing,
    isBlocked,
    hostId,
    isHost
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()
    const { userId } = useAuth()
    const route = useRouter()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostId)
                .then((data) => toast.success(`Вы подписались на ${data.following.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }
    
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostId)
                .then((data) => toast.success(`Вы отписались от ${data.following.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }

    const toggleFollow = () => {
        if (!userId) {
            return route.push("/sign-in")
        }

        if (isHost) return

        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            if (isFollowing) {
                onUnfollow(hostId)
                    .catch(() => toast.error("Что-то пошло не так"))
            }
            onBlock(hostId)
                .then((data) => toast.success(`Вы заблокировали ${data.blocked.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(hostId)
                .then((data) => toast.success(`Вы разблокировали ${data.blocked.username}`))
                .catch(() => toast.error("Что-то пошло не так"))
        })
    }

    const toggleBlock = () => {
        if (!userId) {
            return route.push("/sign-in")
        }

        if (isHost) return

        if (isBlocked) {
            handleUnblock()
        } else {
            handleBlock()
        }
    }


    return (
        <div className="flex gap-2">
            <Button onClick={toggleBlock} variant="ghost" disabled={isPending || isHost}>
                {isBlocked ? "Разблокировать" : "Заблокировать"}
            </Button>
            <Button onClick={toggleFollow} className="w-auto" variant="primary" disabled={isPending || isHost}>
                {isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
        </div>
    )
} 