import { User } from "@prisma/client"
import { UserItem } from "./user-item"

interface RecommendedProps {
    data: User[]
}

export const Recommended = ({
    data
}: RecommendedProps) => {
    return (
        <div className="">
            <p className="text-muted-foreground pl-4">
                Recommended 
            </p>
            <ul className=''>
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