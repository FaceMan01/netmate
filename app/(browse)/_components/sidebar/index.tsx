// "use client"

import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"
import { Wrapper } from "./wrapper"

export const Sidebar = async () => {
    const recommended = await getRecommended()

    return (
        <Wrapper>
            <div className="justify-center mt-4 flex item-center w-full">
                <p className="font-semibold text-primary">
                    For you
                </p>
            </div>
            <div className="space-y-4 pt-4">
                <Recommended data={recommended}/>
            </div>
        </Wrapper>
    )
} 