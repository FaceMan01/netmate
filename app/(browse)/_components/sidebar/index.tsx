import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"
import { Wrapper } from "./wrapper"
import { Following } from "./following"
import { getFollowedUsers } from "@/lib/follow-service"

export const Sidebar = async () => {
    const recommended = await getRecommended()
    const following = await getFollowedUsers()

    return (
        <Wrapper>
            <div className="space-y-4 pt-4">
                <Following data={following}/>
                <Recommended data={recommended}/>
            </div>
        </Wrapper>
    )
} 