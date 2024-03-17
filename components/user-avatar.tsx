import { cva, type VariantProps } from "class-variance-authority"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-9 w-9"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string
    imageUrl: string
    isLive?: boolean
    showBadge?: boolean
}

export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    size
}: UserAvatarProps) => {
    return (
        <div className="relative">
            <Avatar className={cn(
                isLive ? "ring-2 ring-red-500 border border-background" : "brightness-75",
                avatarSizes({size})
            )}>
                <AvatarImage src={imageUrl}/>
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
        </div>
    )
} 
