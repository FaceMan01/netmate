import { getSearchResults } from "@/lib/search-service"
import { StreamCard } from "../../_components/stream-card"

interface ResultsProps {
    term?: string
}

export const Results = async ({
    term
}: ResultsProps) => {
    const streams = await getSearchResults(term)

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Результаты поиска по запросу "{term}"
            </h2>
            {streams.length === 0 && (
                <div className="text-muted-foreground">
                    По вашему запросу ничего не найдено. Попробуйте изменить запросу.
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