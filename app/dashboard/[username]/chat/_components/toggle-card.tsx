"use client"

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useTransition } from "react"
import { updateStream } from "@/actions/stream"

interface ToggleCardProps {
    label: string
    field: string
    value: boolean
}

export const ToggleCard = ({
    label,
    field,
    value
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition()
    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Успешно обновлено"))
                .catch(() => toast.error("Не удалось обновить"))
            
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch disabled={isPending} onCheckedChange={onChange} checked={value}>
                        {value ? "Включено" : "Отключено"}
                    </Switch>
                </div>
            </div>
        </div>
    )
} 