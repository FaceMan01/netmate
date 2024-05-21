import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"
import { Following } from "./following"
import { getFollowedUsers } from "@/lib/follow-service"

export const Sidebar = async () => {
    const recommended = await getRecommended()
    const following = await getFollowedUsers()

    return (
        <div className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <div className="space-y-4 pt-4">
                <Following data={following}/>
                <Recommended data={recommended}/>
            </div>
        </div>
    )
} 