"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ChatFormProps {
    onSubmit: () => void
    value: string
    onChange: (value: string) => void
    isDisabled: boolean
    isFollowing: boolean
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isDisabled,
    isFollowing
}: ChatFormProps) => {
    const handlleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return
        else onSubmit()
    }

    return (
        <form onSubmit={handlleSubmit} className="w-full px-5">
            <div className="w-full">
                <Input
                    onChange={(m) => onChange(m.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder={isDisabled ? "Чат отключен" : "Напишите сообщение..."}
                />
            </div>
            <div className="pt-2 pb-2">
                {!isDisabled &&
                    <Button type="submit" size="sm" onClick={onSubmit}>
                        Отправить
                    </Button>
                }
            </div>
        </form>
    )
} 