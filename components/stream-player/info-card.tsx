"use client"

import Image from "next/image"
import { InfoEdit } from "./info-edit"

interface InfoCardProps {
    name: string
    thumbnailUrl: string | null
    hostId: string
    viewerId: string
}

export const InfoCard = ({
    name,
    thumbnailUrl,
    hostId,
    viewerId,
}: InfoCardProps) => {
    const hostAsViewer = `host-${hostId}`
    const isHost = viewerId === hostAsViewer

    if (!isHost) return

    return (
        <div className="px-4">
            <div className="rounded-xl bg-background">
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Информация о стриме
                        </h2>   
                        <InfoEdit
                            streamName={name}
                            streamThumbnailUrl={thumbnailUrl}
                        />   
                    </div>  
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Название
                        </h3>
                        <p>
                            {name}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Обложка
                        </h3>
                        {thumbnailUrl && (
                            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                                <Image
                                    fill
                                    src={thumbnailUrl}
                                    alt={name}
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
