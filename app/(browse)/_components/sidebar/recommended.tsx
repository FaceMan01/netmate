import { User } from "@prisma/client"
import { UserItem } from "./user-item"

interface RecommendedProps {
    data: User[]
}

export const Recommended = ({
    data
}: RecommendedProps) => {
    return (
        <div>
            <div className="pl-6 mb-4">
                {!!data.length &&
                    <p className="text-muted-foreground">
                        Рекомендуемые каналы
                    </p>
                }
            </div>
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem 
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={true}
                    />
                ))}
            </ul>
        </div>
    )
} 