import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if (!stream) {
        throw new Error("Stream not found")
    }

    return (
        <div className="p-6 ">
            <div className="flex item-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">
                    Настройки чата
                </h1>
            </div>
            <div>
                <ToggleCard
                    field="isChatEnabled"
                    label="Включить чат"
                    value={stream.isChatEnabled}
                />
            </div>
        </div>
    )
} 

export default ChatPage;