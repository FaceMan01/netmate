import { Navigation } from "./navigation"

export const Sidebar = async () => {
    return (
        <div className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <Navigation />
        </div>
    )
} 