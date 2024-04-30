"use client"

import { Maximize } from "lucide-react" 

interface FullscreenProps {
    onToggle: () => void
}

export const Fullscreen = ({
    onToggle
}: FullscreenProps) => {
    return (
        <div className="absolute right-4">
            <button onClick={onToggle} className="p-1.5 hover:bg-white/10 rounded-lg">
                <Maximize/>
            </button>
        </div>
    )
} 