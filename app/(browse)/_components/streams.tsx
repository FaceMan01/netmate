import { getStreams } from "@/lib/feed"
import { StreamCard } from "./stream-card"

export const Streams = async () => {
    const streams = await getStreams()

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Рекомендуемые трансляции
            </h2>
            {streams.length === 0 && (
                <div className="text-muted-foreground ">
                    Здесь пока пусто
                </div>
            )}
            <div className="grid grid-cols-4 gap-6">
                {streams.map((stream) => (
                    <StreamCard
                        key={stream.id}
                        stream={stream}
                    />
                ))}
            </div>
        </div>
    )
} 