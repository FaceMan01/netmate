import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { onFollow, onUnfollow } from "@/actions/follow" 
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"  

interface ActionsProps {
    isFollowing: boolean
    hostId: string
    isHost: boolean
}

export const Actions = ({
    isFollowing,
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

        if (hostId) return

        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    return (
        <Button onClick={toggleFollow} className="w-auto" variant="primary" disabled={isPending || isHost}>
            {isFollowing ? "Отписаться" : "Отслеживать"}
        </Button>
    )
} 