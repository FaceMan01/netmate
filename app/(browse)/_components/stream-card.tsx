import { UserAvatar } from "@/components/user-avatar"
import { Stream, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface StreamCardProps {
    stream: Stream & { user: User }
}

export const StreamCard = ({
    stream
}: StreamCardProps) => {
    return (
        <div>
            <Link href={`/${stream.user.username}`}>
                <div className="h-fill w-full space-y-2">
                    <div className="group aspect-video relative rounded-md border-4 hover:border-indigo-500">
                        {stream.thumbnailUrl ? (
                            <Image
                                src={stream.thumbnailUrl}
                                alt={stream.name}
                                fill
                                className="object-cover "
                            />
                        ) : (
                            <div className="bg-muted flex flex-col items-center justify-center h-full w-full gap-y-4">
                                <UserAvatar
                                    size="lg"
                                    username={stream.user.username}
                                    imageUrl={stream.user.imageUrl}
                                    isLive={stream.isLive}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-x-3">
                            <UserAvatar
                                username={stream.user.username}
                                imageUrl={stream.user.imageUrl}
                                isLive={stream.isLive}
                            />
                            <div className="flex flex-col overflow-hidden font-semibold">
                                <p>
                                    {stream.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {stream.user.username}
                                </p>
                            </div>
                        </div>
                </div>
            </Link>
        </div>
    )
} 