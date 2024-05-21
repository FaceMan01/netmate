import { cva, type VariantProps } from "class-variance-authority"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-9 w-9",
                lg: "h-14 w-14"
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
                isLive && "ring-2 ring-red-500 border border-background",
                avatarSizes({size})
            )}>
                <AvatarImage src={imageUrl} className="object-cover"/>
            </Avatar>
        </div>
    )
} 
