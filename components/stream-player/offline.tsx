interface OfflineVideoProps {
    hostName: string
}

export const OfflineVideo = ({
    hostName
}: OfflineVideoProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-xl">
            Пользователь {hostName} не в сети 😥
        </div>
    )
} 