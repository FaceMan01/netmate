"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"

interface ChatFormProps {
    onSubmit: () => void
    viewerId: string
    value: string
    onChange: (value: string) => void
    isDisabled: boolean
}

export const ChatForm = ({
    onSubmit,
    viewerId,
    value,
    onChange,
    isDisabled
}: ChatFormProps) => {
    const handlleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return
        else onSubmit()
    }

    // FIXIT {viewerId}
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
                {!isDisabled ? (
                    viewerId!="viewer-" ?
                        <Button type="submit" size="sm" onClick={onSubmit}>
                            Отправить
                        </Button>  
                        :
                        <SignInButton>
                            <Button type="submit" size="sm">
                                Отправить
                            </Button>
                        </SignInButton>
                    ) : (
                    <Button type="submit" size="sm" disabled>
                        Отправить
                    </Button>                 
                )}
            </div>
        </form>
    )
} 